"use client";

import { useState, useEffect } from "react";
import { X, Search, Clock, AlertTriangle, Ambulance, Activity } from "lucide-react";
import { RUNNER_MASTER, RECORDS, MedicalRecord } from "@/lib/mockData";

interface RecordEntryProps {
    location: string;
    staffName: string;
    onClose: () => void;
    onSave: () => void;
}

export default function RecordEntry({ location, staffName, onClose, onSave }: RecordEntryProps) {
    const [bibNumber, setBibNumber] = useState("");
    const [runnerInfo, setRunnerInfo] = useState<any>(null);
    const [history, setHistory] = useState<MedicalRecord[]>([]);

    // Form State
    const [injury, setInjury] = useState("");
    const [status, setStatus] = useState("");
    const [ambulance, setAmbulance] = useState(false);
    const [returnToRace, setReturnToRace] = useState(true);

    // Search Runner on Bib Change
    useEffect(() => {
        if (bibNumber.length >= 3) {
            // Mock Search
            const runner = RUNNER_MASTER[bibNumber];
            if (runner) {
                setRunnerInfo(runner);
                const runnerHistory = RECORDS.filter(r => r.bibNumber === bibNumber);
                setHistory(runnerHistory);
            } else {
                setRunnerInfo(null);
                setHistory([]);
            }
        }
    }, [bibNumber]);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
                    <div>
                        <span className="text-primary-light text-sm font-bold uppercase tracking-wider">{location} / Staff: {staffName}</span>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Activity /> 新規記録入力
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content - Split View */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">

                    {/* TOP HALF: Input Area (Scrollable if needed, but intended to be fixed) */}
                    <div className="h-1/2 bg-gray-50 p-6 border-b border-gray-200 overflow-y-auto">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">ゼッケン番号 (任意)</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            value={bibNumber}
                                            onChange={(e) => setBibNumber(e.target.value)}
                                            className="input-field pl-10"
                                            placeholder="1234"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">発生時刻</label>
                                    <div className="input-field bg-gray-100 text-gray-500 font-mono">
                                        {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">傷病名 / 状況</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="例: 副子が痛い、脱水気味"
                                        value={injury}
                                        onChange={(e) => setInjury(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">処置内容 / ステータス</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="例: 給水、経過観察中"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setAmbulance(!ambulance)}
                                    className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${ambulance ? "bg-red-50 border-red-500 text-red-600" : "bg-white border-gray-200 text-gray-400"
                                        }`}
                                >
                                    <Ambulance /> 救急搬送要請
                                </button>
                                <button
                                    onClick={() => setReturnToRace(!returnToRace)}
                                    className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${!returnToRace ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-green-50 border-green-500 text-green-600"
                                        }`}
                                >
                                    {returnToRace ? "レース復帰可能" : "レース中断 (DNF)"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM HALF: 2 Cols */}
                    <div className="h-1/2 flex divide-x divide-gray-200">

                        {/* LEFT: History */}
                        <div className="w-1/2 p-6 overflow-y-auto bg-white">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Clock size={16} /> 過去の履歴 (他拠点含む)
                            </h3>
                            {history.length > 0 ? (
                                <div className="space-y-4">
                                    {history.map((rec) => (
                                        <div key={rec.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-bold text-primary">{rec.location}</span>
                                                <span className="text-gray-500">{rec.timestamp}</span>
                                            </div>
                                            <div className="font-bold text-gray-800">{rec.injury}</div>
                                            <div className="text-gray-600">{rec.status}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-300 py-10">
                                    履歴なし
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Runner Info */}
                        <div className="w-1/2 p-6 overflow-y-auto bg-purple-50">
                            <h3 className="text-sm font-bold text-primary-light uppercase tracking-wider mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} /> ランナー情報
                            </h3>
                            {runnerInfo ? (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <div className="text-xs text-gray-400">氏名</div>
                                        <div className="text-2xl font-bold text-gray-800">{runnerInfo.name}</div>
                                        <div className="text-gray-500">{runnerInfo.age}歳 / {runnerInfo.gender}</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-400">
                                        <div className="text-xs text-gray-400 mb-1">緊急連絡先</div>
                                        <div className="text-lg font-bold text-red-500">{runnerInfo.emergencyContact}</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <div className="text-xs text-gray-400 mb-1">特記事項</div>
                                        <div className="text-gray-700">{runnerInfo.notes}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-purple-200 py-10">
                                    ゼッケンを入力すると<br />ここに情報が表示されます
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white border-t border-gray-200 flex justify-end gap-4 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
                    <button onClick={onClose} className="btn w-32 bg-gray-100 text-gray-600 hover:bg-gray-200">キャンセル</button>
                    <button onClick={onSave} className="btn btn-primary w-64 shadow-lg">記録を保存</button>
                </div>
            </div>
        </div>
    );
}
