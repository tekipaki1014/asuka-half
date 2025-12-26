"use client";

import { useState, useEffect, useMemo } from "react";
import Login from "../components/Login";
import RecordEntry from "../components/RecordEntry";
import { RECORDS, STAFF_MASTER, MedicalRecord } from "@/lib/mockData";
import { Plus, Search, Activity, Ambulance, AlertCircle, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

type TabId = 'ALL' | 'HQ' | '1st' | '2nd' | '3rd' | 'Finish';

const TABS: { id: TabId; label: string; locationMatch: string }[] = [
  { id: 'ALL', label: '全体', locationMatch: '' },
  { id: 'HQ', label: '本部', locationMatch: '本部' },
  { id: '1st', label: '第1救護所', locationMatch: '第1' },
  { id: '2nd', label: '第2救護所', locationMatch: '第2' },
  { id: '3rd', label: '第3救護所', locationMatch: '第3' },
  { id: 'Finish', label: 'フィニッシュ', locationMatch: 'フィニッシュ' },
];

// Helper: Count records per bib number across all locations
function getRecordCountByBib(): Record<string, { count: number; locations: Set<string> }> {
  const map: Record<string, { count: number; locations: Set<string> }> = {};
  RECORDS.forEach(r => {
    if (!map[r.bibNumber]) {
      map[r.bibNumber] = { count: 0, locations: new Set() };
    }
    map[r.bibNumber].count++;
    map[r.bibNumber].locations.add(r.location);
  });
  return map;
}

// Helper: Get all records for a specific bib number
function getOtherRecords(bibNumber: string, excludeId: string): MedicalRecord[] {
  return RECORDS.filter(r => r.bibNumber === bibNumber && r.id !== excludeId);
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('ALL');
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Pre-compute record counts
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
      r.staffName.includes(searchQuery);
    return locMatch && searchMatch;
  });

  const currentStaffList = activeTab === 'ALL' || activeTab === 'HQ'
    ? STAFF_MASTER.filter(s => s.role === '本部')
    : activeTab === '1st'
      ? STAFF_MASTER.filter(s => s.role === '第1')
      : STAFF_MASTER;

  const toggleRow = (id: string) => {
    setExpandedRowId(prev => prev === id ? null : id);
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
            onClick={() => setIsEntryModalOpen(true)}
          >
            <Plus size={18} /> 記録を追加
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="ゼッケン番号・傷病名・担当者で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>時刻</th>
                {activeTab === 'ALL' && <th style={{ width: 100 }}>場所</th>}
                <th style={{ width: 100 }}>No.</th>
                <th>傷病名</th>
                <th style={{ width: 160 }}>状況</th>
                <th style={{ width: 90 }}>搬送/復帰</th>
                <th style={{ width: 100 }}>担当</th>
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
                    <>
                      <tr
                        key={rec.id}
                        className={`animate-in ${hasMultipleRecords ? 'row-clickable' : ''} ${isExpanded ? 'row-expanded' : ''}`}
                        onClick={() => hasMultipleRecords && toggleRow(rec.id)}
                        style={{ cursor: hasMultipleRecords ? 'pointer' : 'default' }}
                      >
                        <td className="cell-time">{rec.timestamp}</td>
                        {activeTab === 'ALL' && (
                          <td><span className="cell-location">{rec.location}</span></td>
                        )}
                        <td className="cell-bib">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            #{rec.bibNumber}
                            {hasMultipleRecords && (
                              <span className="alert-badge" title={`${bibInfo.count}件の記録あり`}>
                                <AlertTriangle size={12} />
                                <span>注意</span>
                              </span>
                            )}
                            {hasMultipleRecords && (
                              isExpanded ? <ChevronUp size={14} className="expand-icon" /> : <ChevronDown size={14} className="expand-icon" />
                            )}
                          </div>
                        </td>
                        <td className="cell-injury">{rec.injury}</td>
                        <td>
                          <span className={`cell-status ${rec.ambulance ? 'status-active' : 'status-done'}`}>
                            {rec.status}
                          </span>
                        </td>
                        <td>
                          <div className="cell-badges">
                            {rec.ambulance && (
                              <span className="badge badge-danger" title="救急搬送">
                                <Ambulance size={14} />
                              </span>
                            )}
                            {!rec.returnToRace && !rec.ambulance && (
                              <span className="badge badge-warning" title="DNF">
                                <AlertCircle size={14} />
                              </span>
                            )}
                            {rec.returnToRace && !rec.ambulance && (
                              <span className="badge badge-success" title="復帰済">
                                <CheckCircle size={14} />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="cell-staff">{rec.staffName}</td>
                      </tr>

                      {/* Expanded rows showing other records for this bib number */}
                      {isExpanded && otherRecords.map(other => (
                        <tr key={`sub-${other.id}`} className="sub-row animate-in">
                          <td className="cell-time">{other.timestamp}</td>
                          <td colSpan={activeTab === 'ALL' ? 1 : 0}>
                            <span className="cell-location">{other.location}</span>
                          </td>
                          {activeTab !== 'ALL' && <td></td>}
                          <td className="cell-injury" style={{ color: '#666' }}>{other.injury}</td>
                          <td>
                            <span className="cell-status status-done" style={{ background: '#E5E7EB' }}>
                              {other.status}
                            </span>
                          </td>
                          <td>
                            <div className="cell-badges">
                              {other.ambulance && <span className="badge badge-danger"><Ambulance size={14} /></span>}
                            </div>
                          </td>
                          <td className="cell-staff">{other.staffName}</td>
                        </tr>
                      ))}
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={activeTab === 'ALL' ? 7 : 6} className="empty-state">
                    記録がありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Entry Modal */}
      {isEntryModalOpen && (
        <RecordEntry
          location={currentTabInfo.label}
          staffName={selectedStaff}
          onClose={() => setIsEntryModalOpen(false)}
          onSave={() => {
            alert("保存しました (Mock)");
            setIsEntryModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
