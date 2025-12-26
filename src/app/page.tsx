"use client";

import React, { useState, useEffect, useMemo } from "react";
import Login from "../components/Login";
import RecordEntry from "../components/RecordEntry";
import { RECORDS, STAFF_MASTER, MedicalRecord, getRecordCountByBib } from "@/lib/mockData";
import { Plus, Search, Activity, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

type TabId = 'ALL' | 'HQ' | '1st' | '2nd' | '3rd' | 'Finish';

const TABS: { id: TabId; label: string; locationMatch: string }[] = [
  { id: 'ALL', label: '全体', locationMatch: '' },
  { id: 'HQ', label: '本部', locationMatch: '本部' },
  { id: '1st', label: '第1', locationMatch: '第1' },
  { id: '2nd', label: '第2', locationMatch: '第2' },
  { id: '3rd', label: '第3', locationMatch: '第3' },
  { id: 'Finish', label: 'フィニッシュ', locationMatch: 'フィニッシュ' },
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('ALL');
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const recordCounts = useMemo(() => getRecordCountByBib(), []);

  useEffect(() => {
    if (localStorage.getItem("auth_code") === "1234") setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("auth_code", "1234");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_code");
    setIsAuthenticated(false);
  };

  const currentTabInfo = TABS.find(t => t.id === activeTab)!;

  const filteredRecords = RECORDS.filter(r => {
    const locMatch = activeTab === 'ALL' || r.location === currentTabInfo.locationMatch;
    const searchMatch = !searchQuery ||
      r.bibNumber.includes(searchQuery) ||
      r.injury.includes(searchQuery) ||
      r.content.includes(searchQuery) ||
      r.staffName.includes(searchQuery);
    return locMatch && searchMatch;
  });

  const currentStaffList = STAFF_MASTER.filter(s => {
    if (activeTab === 'ALL' || activeTab === 'HQ') return s.role === '本部';
    if (activeTab === '1st') return s.role === '第1';
    if (activeTab === '2nd') return s.role === '第2';
    if (activeTab === '3rd') return s.role === '第3';
    if (activeTab === 'Finish') return s.role === 'フィニッシュ';
    return true;
  });

  const toggleExpandRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRowId(prev => prev === id ? null : id);
  };

  const handleRowClick = (rec: MedicalRecord) => {
    setEditingRecord(rec);
    setIsEntryModalOpen(true);
  };

  const handleNewRecord = () => {
    setEditingRecord(null);
    setIsEntryModalOpen(true);
  };

  const getOtherRecords = (bibNumber: string, excludeId: string): MedicalRecord[] => {
    return RECORDS.filter(r => r.bibNumber === bibNumber && r.id !== excludeId);
  };

  if (loading) return null;
  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <Activity size={20} />
          明日香ハーフ 救護記録
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
          ログアウト
        </button>
      </header>

      {/* Tabs */}
      <nav className="tabs-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedStaff(""); setExpandedRowId(null); }}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Action Bar */}
      {activeTab !== 'ALL' && (
        <div className="action-bar animate-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label>担当者:</label>
            <select
              className="select-field"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">選択してください</option>
              {currentStaffList.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            disabled={!selectedStaff}
            onClick={handleNewRecord}
          >
            <Plus size={18} /> 新規記録
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="ゼッケン・傷病名・内容で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>No.</th>
                <th style={{ width: 60 }}>時刻</th>
                <th style={{ width: 70 }}>発信</th>
                {activeTab === 'ALL' && <th style={{ width: 80 }}>区</th>}
                <th style={{ width: 70 }}>ゼッケン</th>
                <th style={{ width: 60 }}>意識</th>
                <th>内容</th>
                <th style={{ width: 120 }}>対応</th>
                <th style={{ width: 60 }}>重傷度</th>
                <th style={{ width: 50 }}>済</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => {
                  const bibInfo = recordCounts[rec.bibNumber];
                  const hasMultipleRecords = bibInfo && bibInfo.count > 1;
                  const isExpanded = expandedRowId === rec.id;
                  const otherRecords = isExpanded ? getOtherRecords(rec.bibNumber, rec.id) : [];

                  return (
                    <React.Fragment key={rec.id}>
                      <tr
                        key={rec.id}
                        className={`animate-in row-clickable ${isExpanded ? 'row-expanded' : ''}`}
                        onClick={() => handleRowClick(rec)}
                      >
                        <td className="cell-serial">{rec.serialNumber}</td>
                        <td className="cell-time">{rec.timestamp}</td>
                        <td className="cell-sender">{rec.sender}</td>
                        {activeTab === 'ALL' && (
                          <td><span className="cell-location">{rec.location}</span></td>
                        )}
                        <td className="cell-bib">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            #{rec.bibNumber}
                            {hasMultipleRecords && (
                              <button
                                className="expand-btn"
                                onClick={(e) => toggleExpandRow(rec.id, e)}
                                title={`${bibInfo.count}件の記録`}
                              >
                                <span>他記録あり</span>
                                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className={`cell-consciousness ${rec.consciousness === '有' ? '' : 'danger'}`}>
                          {rec.consciousness}
                        </td>
                        <td className="cell-content">
                          <div className="content-truncate">{rec.content}</div>
                        </td>
                        <td>
                          <span className={`cell-response ${rec.ambulance ? 'response-danger' : ''}`}>
                            {rec.response}
                          </span>
                        </td>
                        <td className="cell-severity">
                          {rec.severity && (
                            <span className={`severity-badge severity-${rec.severity}`}>
                              {rec.severity}
                            </span>
                          )}
                        </td>
                        <td className="cell-completed">
                          {rec.completed && <CheckCircle size={18} className="check-icon" />}
                        </td>
                      </tr>

                      {/* Expanded sub-rows */}
                      {isExpanded && otherRecords.map(other => (
                        <tr
                          key={`sub-${other.id}`}
                          className="sub-row animate-in"
                          onClick={() => handleRowClick(other)}
                        >
                          <td className="cell-serial">{other.serialNumber}</td>
                          <td className="cell-time">{other.timestamp}</td>
                          <td className="cell-sender">{other.sender}</td>
                          {activeTab === 'ALL' && (
                            <td><span className="cell-location">{other.location}</span></td>
                          )}
                          <td className="cell-bib">#{other.bibNumber}</td>
                          <td className="cell-consciousness">{other.consciousness}</td>
                          <td className="cell-content">
                            <div className="content-truncate">{other.content}</div>
                          </td>
                          <td>
                            <span className={`cell-response ${other.ambulance ? 'response-danger' : ''}`}>
                              {other.response}
                            </span>
                          </td>
                          <td className="cell-severity">
                            {other.severity && (
                              <span className={`severity-badge severity-${other.severity}`}>
                                {other.severity}
                              </span>
                            )}
                          </td>
                          <td className="cell-completed">
                            {other.completed && <CheckCircle size={18} className="check-icon" />}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={activeTab === 'ALL' ? 10 : 9} className="empty-state">
                    記録がありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Entry/Edit Modal */}
      {isEntryModalOpen && (
        <RecordEntry
          location={currentTabInfo.label}
          staffName={selectedStaff}
          editRecord={editingRecord}
          onClose={() => { setIsEntryModalOpen(false); setEditingRecord(null); }}
          onSave={() => {
            alert(editingRecord ? "更新しました (Mock)" : "保存しました (Mock)");
            setIsEntryModalOpen(false);
            setEditingRecord(null);
          }}
        />
      )}
    </div>
  );
}
