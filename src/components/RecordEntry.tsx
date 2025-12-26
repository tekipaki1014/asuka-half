"use client";

import { useState, useEffect } from "react";
import { X, Clock, User, Save, FileText } from "lucide-react";
import { RUNNER_MASTER, RECORDS, MedicalRecord, Runner } from "@/lib/mockData";

interface RecordEntryProps {
    location: string;
    staffName: string;
    editRecord?: MedicalRecord | null;
    onClose: () => void;
    onSave: () => void;
}

export default function RecordEntry({ location, staffName, editRecord, onClose, onSave }: RecordEntryProps) {
    const isEditMode = !!editRecord;

    // Form State
    const [bibNumber, setBibNumber] = useState(editRecord?.bibNumber || "");
    const [runnerInfo, setRunnerInfo] = useState<Runner | null>(null);
    const [history, setHistory] = useState<MedicalRecord[]>([]);

    const [sender, setSender] = useState(editRecord?.sender || "");
    const [consciousness, setConsciousness] = useState(editRecord?.consciousness || "有");
    const [content, setContent] = useState(editRecord?.content || "");
    const [response, setResponse] = useState(editRecord?.response || "");
    const [severity, setSeverity] = useState(editRecord?.severity || "");
    const [ambulance, setAmbulance] = useState(editRecord?.ambulance || false);
    const [completed, setCompleted] = useState(editRecord?.completed || false);

    useEffect(() => {
        if (bibNumber.length >= 1) {
            const runner = RUNNER_MASTER[bibNumber];
            if (runner) {
                setRunnerInfo(runner);
                const runnerHistory = RECORDS.filter(r => r.bibNumber === bibNumber && r.id !== editRecord?.id);
                setHistory(runnerHistory);
            } else {
                setRunnerInfo(null);
                setHistory([]);
            }
        } else {
            setRunnerInfo(null);
            setHistory([]);
        }
    }, [bibNumber, editRecord?.id]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-fullwidth" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span style={{ opacity: 0.7, fontSize: 12 }}>{location} / {staffName || '担当未選択'}</span>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                            <FileText size={20} />
                            {isEditMode ? `記録 #${editRecord.serialNumber} を編集` : '新規記録入力'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="modal-close-btn">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body-full">

                    {/* Row 1: Basic Fields */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>ゼッケン</label>
                            <input
                                type="text"
                                value={bibNumber}
                                onChange={(e) => setBibNumber(e.target.value)}
                                placeholder="1234"
                                autoFocus={!isEditMode}
                            />
                        </div>
                        <div className="input-group">
                            <label>発信元</label>
                            <input
                                type="text"
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                placeholder="例: ボランティア"
                            />
                        </div>
                        <div className="input-group" style={{ width: 100 }}>
                            <label>意識</label>
                            <select value={consciousness} onChange={(e) => setConsciousness(e.target.value)}>
                                <option value="有">有</option>
                                <option value="無">無</option>
                                <option value="不明">不明</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ width: 100 }}>
                            <label>時刻</label>
                            <input
                                type="text"
                                value={isEditMode ? editRecord.timestamp : new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                disabled
                                className="input-disabled"
                            />
                        </div>
                    </div>

                    {/* Row 2: Content */}
                    <div className="input-row">
                        <div className="input-group" style={{ flex: 1 }}>
                            <label>内容（詳細）</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="状況の詳細を記入..."
                                rows={3}
                                className="textarea-full"
                            />
                        </div>
                    </div>

                    {/* Row 3: Response, Severity, Status */}
                    <div className="input-row">
                        <div className="input-group" style={{ flex: 1 }}>
                            <label>対応</label>
                            <select value={response} onChange={(e) => setResponse(e.target.value)}>
                                <option value="">選択してください</option>
                                <option value="経過観察で継続">経過観察で継続</option>
                                <option value="継続">継続</option>
                                <option value="一時休止後に再開">一時休止後に再開</option>
                                <option value="リタイア(自身)">リタイア(自身)</option>
                                <option value="リタイア">リタイア</option>
                                <option value="フィニッシュ救護所">フィニッシュ救護所</option>
                                <option value="本部経過観察">本部経過観察</option>
                                <option value="帰宅">帰宅</option>
                                <option value="帰宅（家族迎え）">帰宅（家族迎え）</option>
                                <option value="車両搬送">車両搬送</option>
                                <option value="救急要請">救急要請</option>
                                <option value="救急搬送">救急搬送</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ width: 150 }}>
                            <label>重傷度</label>
                            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                                <option value="">なし</option>
                                <option value="軽度">軽度</option>
                                <option value="中度">中度</option>
                                <option value="重度">重度</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ width: 200 }}>
                            <label>ステータス</label>
                            <div className="status-buttons">
                                <button
                                    type="button"
                                    onClick={() => setAmbulance(!ambulance)}
                                    className={`status-btn ${ambulance ? 'active-danger' : ''}`}
                                >
                                    救急
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCompleted(!completed)}
                                    className={`status-btn ${completed ? 'active-success' : ''}`}
                                >
                                    済
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3-Column Split */}
                    <div className="three-panel">
                        {/* Panel 1: Current Record Summary */}
                        <div className="panel">
                            <h3 className="panel-header">
                                <FileText size={14} /> 今回の記録
                            </h3>
                            <div className="panel-content">
                                <div className="summary-item">
                                    <span className="summary-label">ゼッケン:</span>
                                    <span className="summary-value">#{bibNumber || '-'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">発信元:</span>
                                    <span className="summary-value">{sender || '-'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">対応:</span>
                                    <span className="summary-value">{response || '-'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">重傷度:</span>
                                    <span className="summary-value">{severity || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: History */}
                        <div className="panel">
                            <h3 className="panel-header">
                                <Clock size={14} /> 過去の履歴（同一ゼッケン）
                            </h3>
                            <div className="panel-content panel-scrollable">
                                {history.length > 0 ? (
                                    <table className="history-table">
                                        <thead>
                                            <tr>
                                                <th>時刻</th>
                                                <th>場所</th>
                                                <th>内容</th>
                                                <th>対応</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((rec) => (
                                                <tr key={rec.id}>
                                                    <td>{rec.timestamp}</td>
                                                    <td>{rec.location}</td>
                                                    <td className="history-content">{rec.content.substring(0, 30)}...</td>
                                                    <td>{rec.response}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="panel-empty">履歴なし</div>
                                )}
                            </div>
                        </div>

                        {/* Panel 3: Runner Info */}
                        <div className="panel panel-highlight">
                            <h3 className="panel-header">
                                <User size={14} /> ランナー情報
                            </h3>
                            <div className="panel-content">
                                {runnerInfo ? (
                                    <div className="runner-card">
                                        <div className="runner-name">{runnerInfo.name}</div>
                                        <div className="runner-meta">
                                            {runnerInfo.age}歳 / {runnerInfo.gender} / 過去{runnerInfo.participationCount}回参加
                                        </div>
                                        <div className="runner-contact">
                                            <div className="contact-label">緊急連絡先</div>
                                            <div className="contact-value">{runnerInfo.emergencyContact}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="panel-empty">ゼッケンを入力すると表示</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-secondary">キャンセル</button>
                    <button onClick={onSave} className="btn btn-primary">
                        <Save size={16} /> {isEditMode ? '更新する' : '記録を保存'}
                    </button>
                </div>
            </div>
        </div>
    );
}
