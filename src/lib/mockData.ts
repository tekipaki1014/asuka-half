// ===== Types =====
export interface MedicalRecord {
    id: string;
    serialNumber: number;        // 整理番号
    timestamp: string;           // 時刻 (HH:MM)
    sender: string;              // 発信（報告元）
    receiver: string;            // 受信（受信者）
    location: string;            // 区（場所）
    bibNumber: string;           // ゼッケン
    age?: number;                // 年齢（ランナーマスタから）
    gender?: string;             // 性別（ランナーマスタから）
    consciousness: string;       // 意識有無
    content: string;             // 内容
    response: string;            // 対応
    severity: string;            // 重傷度
    completed: boolean;          // 済
    staffName: string;           // 担当者（後方互換）
    // Legacy fields for backward compatibility
    injury: string;              // 傷病名
    status: string;              // 状況
    ambulance: boolean;          // 救急搬送
    returnToRace: boolean;       // レース復帰
}

export interface Runner {
    bibNumber: string;
    name: string;
    furigana: string;
    address: string;
    participationCount: number;
    phone: string;
    emergencyContact: string;
    hasSupport: boolean;
    age?: number;
    gender?: string;
}

export interface Staff {
    name: string;
    furigana: string;
    role: string;
    qualification: string;
}

// ===== スタッフマスタ =====
export const STAFF_MASTER: Staff[] = [
    { name: "和田D", furigana: "ワダディー", role: "本部", qualification: "Dr" },
    { name: "安藤AT", furigana: "アンドウエーティー", role: "本部", qualification: "AT" },
    { name: "西澤AT", furigana: "ニシザワエーティー", role: "本部", qualification: "AT" },
    { name: "福本AT", furigana: "フクモトエーティー", role: "本部", qualification: "AT" },
    { name: "羽角Dr", furigana: "ハスミドクター", role: "第1", qualification: "Dr" },
    { name: "西村Ns", furigana: "ニシムラナース", role: "第1", qualification: "Ns" },
    { name: "田中AT", furigana: "タナカエーティー", role: "第2", qualification: "AT" },
    { name: "山本Ns", furigana: "ヤマモトナース", role: "第2", qualification: "Ns" },
    { name: "佐藤AT", furigana: "サトウエーティー", role: "第3", qualification: "AT" },
    { name: "鈴木Dr", furigana: "スズキドクター", role: "フィニッシュ", qualification: "Dr" },
];

// ===== ランナーマスタ =====
export const RUNNER_MASTER: { [key: string]: Runner } = {
    "1": { bibNumber: "1", name: "佐藤太郎", furigana: "サトウタロウ", address: "奈良県奈良市", participationCount: 3, phone: "090-4996-6328", emergencyContact: "080-2031-4130", hasSupport: false, age: 42, gender: "男" },
    "2": { bibNumber: "2", name: "鈴木花子", furigana: "スズキハナコ", address: "大阪府生駒市", participationCount: 3, phone: "090-2550-4871", emergencyContact: "080-6200-2366", hasSupport: true, age: 35, gender: "女" },
    "3": { bibNumber: "3", name: "高橋健一", furigana: "タカハシケンイチ", address: "京都府橿原市", participationCount: 0, phone: "090-6234-8260", emergencyContact: "080-1806-3231", hasSupport: true, age: 28, gender: "男" },
    "5": { bibNumber: "5", name: "伊藤翔太", furigana: "イトウショウタ", address: "三重県大和郡山市", participationCount: 2, phone: "090-4350-8815", emergencyContact: "080-8253-9541", hasSupport: true, age: 31, gender: "男" },
    "7": { bibNumber: "7", name: "中村大輔", furigana: "ナカムラダイスケ", address: "奈良県奈良市", participationCount: 2, phone: "090-3492-9808", emergencyContact: "080-7462-4592", hasSupport: false, age: 45, gender: "男" },
    "8": { bibNumber: "8", name: "小林彩香", furigana: "コバヤシアヤカ", address: "大阪府生駒市", participationCount: 3, phone: "090-6971-8332", emergencyContact: "080-1370-9121", hasSupport: true, age: 29, gender: "女" },
    "12": { bibNumber: "12", name: "佐々木さくら", furigana: "ササキサクラ", address: "和歌山県桜井市", participationCount: 2, phone: "090-6414-7130", emergencyContact: "080-3583-6940", hasSupport: true, age: 33, gender: "女" },
    "15": { bibNumber: "15", name: "井上結衣", furigana: "イノウエユイ", address: "京都府橿原市", participationCount: 4, phone: "090-5840-5284", emergencyContact: "080-9667-2166", hasSupport: false, age: 27, gender: "女" },
    "18": { bibNumber: "18", name: "斎藤航", furigana: "サイトウワタル", address: "和歌山県桜井市", participationCount: 5, phone: "090-1700-1012", emergencyContact: "080-6028-1505", hasSupport: false, age: 38, gender: "男" },
    "21": { bibNumber: "21", name: "阿部真由", furigana: "アベマユ", address: "京都府橿原市", participationCount: 4, phone: "090-2638-1902", emergencyContact: "080-9888-5500", hasSupport: false, age: 41, gender: "女" },
    "24": { bibNumber: "24", name: "橋本拓海", furigana: "ハシモトタクミ", address: "和歌山県桜井市", participationCount: 2, phone: "090-4576-1545", emergencyContact: "080-9193-4562", hasSupport: false, age: 36, gender: "男" },
    "27": { bibNumber: "27", name: "中島芽衣", furigana: "ナカジマメイ", address: "京都府橿原市", participationCount: 3, phone: "090-5183-5000", emergencyContact: "080-8473-4968", hasSupport: true, age: 25, gender: "女" },
    "30": { bibNumber: "30", name: "小川淳", furigana: "オガワジュン", address: "和歌山県桜井市", participationCount: 1, phone: "090-8043-8754", emergencyContact: "080-3077-9732", hasSupport: false, age: 52, gender: "男" },
};

// ===== 対応記録 =====
export const RECORDS: MedicalRecord[] = [
    // --- 通常のケース（重複なし）---
    { id: "1", serialNumber: 1, timestamp: "09:12", sender: "ボランティア", receiver: "鳥田(PT)", location: "第1", bibNumber: "1", consciousness: "有", content: "開始早々棄権で、受付に歩いて戻られていますと電話。実行委員に報告", response: "リタイア(自身)", severity: "", completed: true, staffName: "羽角Dr", injury: "棄権申告", status: "受付誘導", ambulance: false, returnToRace: false },

    { id: "2", serialNumber: 2, timestamp: "09:24", sender: "第1救護所", receiver: "西澤AT", location: "第1", bibNumber: "7", consciousness: "有", content: "7区、転倒して額から出血、絆創膏、リタイア\n→本部から7区へ車両を派遣し迎えに行く（薮Nsが現場で対応中）\nフィニッシュ救護所へ向かってもらうようにお伝えする、AED隊がゴールで待機\n→9:44迎えの車に乗る➡旦さん経由でフィニッシュへ誘導", response: "フィニッシュ救護所", severity: "軽度", completed: true, staffName: "西澤AT", injury: "額出血", status: "絆創膏処置", ambulance: false, returnToRace: false },

    { id: "3", serialNumber: 3, timestamp: "09:35", sender: "第2救護所", receiver: "田中AT", location: "第2", bibNumber: "3", consciousness: "有", content: "膝の痛みを訴え来所。テーピング処置後、様子見で継続走行を希望", response: "経過観察で継続", severity: "", completed: true, staffName: "田中AT", injury: "膝痛", status: "テーピング", ambulance: false, returnToRace: true },

    { id: "4", serialNumber: 4, timestamp: "09:48", sender: "AED隊", receiver: "本部", location: "本部", bibNumber: "5", consciousness: "有", content: "コース上でふらつき発見、声かけで意識清明。水分補給で回復傾向", response: "経過観察", severity: "", completed: true, staffName: "安藤AT", injury: "ふらつき", status: "水分補給", ambulance: false, returnToRace: true },

    // --- 同一ランナー複数記録（#7 額出血の経過）---
    { id: "5", serialNumber: 5, timestamp: "09:55", sender: "フィニッシュ", receiver: "鈴木Dr", location: "フィニッシュ", bibNumber: "7", consciousness: "有", content: "#7到着。出血は止まっている。創部洗浄と再絆創膏。本人希望で帰宅指導", response: "帰宅", severity: "軽度", completed: true, staffName: "鈴木Dr", injury: "額出血（経過）", status: "創部洗浄", ambulance: false, returnToRace: false },

    { id: "6", serialNumber: 6, timestamp: "10:05", sender: "第3救護所", receiver: "佐藤AT", location: "第3", bibNumber: "12", consciousness: "有", content: "ふくらはぎ痙攣で来所。ストレッチ・冷却で軽減、10分休憩後に再走行希望", response: "一時休止後に再開", severity: "", completed: true, staffName: "佐藤AT", injury: "下腿筋痙攣", status: "ストレッチ・冷却", ambulance: false, returnToRace: true },

    { id: "7", serialNumber: 7, timestamp: "10:12", sender: "第1救護所", receiver: "西村Ns", location: "第1", bibNumber: "8", consciousness: "有", content: "転倒による膝擦過傷。消毒・絆創膏処置。痛みは軽度で継続希望", response: "継続", severity: "", completed: true, staffName: "西村Ns", injury: "膝擦過傷", status: "消毒・絆創膏", ambulance: false, returnToRace: true },

    // --- 同一ランナー複数記録（#12 痙攣悪化）---
    { id: "8", serialNumber: 8, timestamp: "10:28", sender: "第3救護所", receiver: "佐藤AT", location: "第3", bibNumber: "12", consciousness: "有", content: "#12再来所。痙攣再発で歩行困難。本部に車両要請中", response: "車両搬送", severity: "中度", completed: false, staffName: "佐藤AT", injury: "下腿筋痙攣増悪", status: "車両待ち", ambulance: false, returnToRace: false },

    { id: "9", serialNumber: 9, timestamp: "10:35", sender: "本部", receiver: "和田D", location: "本部", bibNumber: "15", consciousness: "有", content: "熱中症疑いで第2から搬送されてきた。体温38.2℃、冷却開始", response: "本部経過観察", severity: "中度", completed: false, staffName: "和田D", injury: "熱中症疑い", status: "冷却中", ambulance: false, returnToRace: false },

    { id: "10", serialNumber: 10, timestamp: "10:42", sender: "第2救護所", receiver: "山本Ns", location: "第2", bibNumber: "18", consciousness: "有", content: "足底痛で来所。簡易テーピングで対応。ペースを落として継続希望", response: "継続", severity: "", completed: true, staffName: "山本Ns", injury: "足底痛", status: "テーピング", ambulance: false, returnToRace: true },

    // --- 同一ランナー複数記録（#15 熱中症経過）---
    { id: "11", serialNumber: 11, timestamp: "10:55", sender: "本部", receiver: "和田D", location: "本部", bibNumber: "15", consciousness: "有", content: "#15体温37.8℃まで低下。意識清明で水分摂取可能。経過良好", response: "経過良好", severity: "軽度", completed: true, staffName: "和田D", injury: "熱中症（回復中）", status: "継続観察", ambulance: false, returnToRace: false },

    { id: "12", serialNumber: 12, timestamp: "11:02", sender: "AED隊", receiver: "本部", location: "本部", bibNumber: "21", consciousness: "有", content: "胸部不快感を訴え。心電図モニター装着、ST変化なし。問診で既往なし", response: "本部経過観察", severity: "中度", completed: false, staffName: "福本AT", injury: "胸部不快感", status: "心電図監視中", ambulance: false, returnToRace: false },

    { id: "13", serialNumber: 13, timestamp: "11:15", sender: "第1救護所", receiver: "羽角Dr", location: "第1", bibNumber: "24", consciousness: "有", content: "嘔気あり来所。脱水傾向のため経口補水液投与。20分安静指示", response: "安静・経口補水", severity: "", completed: true, staffName: "羽角Dr", injury: "嘔気・脱水", status: "経口補水液", ambulance: false, returnToRace: true },

    // --- 同一ランナー複数記録（#21 胸部不快感経過）---
    { id: "14", serialNumber: 14, timestamp: "11:28", sender: "本部", receiver: "和田D", location: "本部", bibNumber: "21", consciousness: "有", content: "#21症状持続。念のため救急搬送を本人・家族に提案。同意得られる", response: "救急要請", severity: "重度", completed: false, staffName: "和田D", injury: "胸部不快感持続", status: "救急待ち", ambulance: true, returnToRace: false },

    { id: "15", serialNumber: 15, timestamp: "11:35", sender: "フィニッシュ", receiver: "鈴木Dr", location: "フィニッシュ", bibNumber: "27", consciousness: "有", content: "完走後に過呼吸様症状。座位休息と呼吸指導で改善傾向", response: "経過観察", severity: "", completed: true, staffName: "鈴木Dr", injury: "過呼吸様", status: "呼吸指導", ambulance: false, returnToRace: false },

    // --- 同一ランナー複数記録（#21 救急対応）---
    { id: "16", serialNumber: 16, timestamp: "11:45", sender: "本部", receiver: "和田D", location: "本部", bibNumber: "21", consciousness: "有", content: "#21救急車到着。バイタル安定のまま県立医療センターへ搬送開始", response: "救急搬送", severity: "重度", completed: true, staffName: "和田D", injury: "胸部不快感", status: "救急搬送完了", ambulance: true, returnToRace: false },

    { id: "17", serialNumber: 17, timestamp: "11:52", sender: "第2救護所", receiver: "田中AT", location: "第2", bibNumber: "30", consciousness: "有", content: "腰痛で来所。既往のヘルニアあり。無理せずリタイアを勧告、本人同意", response: "リタイア", severity: "", completed: true, staffName: "田中AT", injury: "腰痛（既往あり）", status: "リタイア勧告", ambulance: false, returnToRace: false },

    { id: "18", serialNumber: 18, timestamp: "12:05", sender: "第3救護所", receiver: "佐藤AT", location: "第3", bibNumber: "5", consciousness: "有", content: "#5再来。先ほどのふらつきから回復し完走を目指すとのこと。激励して見送り", response: "継続", severity: "", completed: true, staffName: "佐藤AT", injury: "経過確認", status: "問題なし", ambulance: false, returnToRace: true },

    // --- 同一ランナー複数記録（#12 車両搬送後）---
    { id: "19", serialNumber: 19, timestamp: "12:12", sender: "フィニッシュ", receiver: "鈴木Dr", location: "フィニッシュ", bibNumber: "12", consciousness: "有", content: "#12車両でフィニッシュに到着。歩行可能になったが本日は終了。家族に連絡済み", response: "帰宅（家族迎え）", severity: "軽度", completed: true, staffName: "鈴木Dr", injury: "下腿筋痙攣（回復）", status: "帰宅手配", ambulance: false, returnToRace: false },

    { id: "20", serialNumber: 20, timestamp: "12:25", sender: "第1救護所", receiver: "西村Ns", location: "第1", bibNumber: "2", consciousness: "有", content: "足趾水疱で来所。テーピング保護で対応。ゆっくり完走を目指すとのこと", response: "継続", severity: "", completed: true, staffName: "西村Ns", injury: "足趾水疱", status: "テーピング保護", ambulance: false, returnToRace: true },
];

// Helper to get runner info
export function getRunner(bibNumber: string): Runner | undefined {
    return RUNNER_MASTER[bibNumber];
}

// Helper to get records for a specific runner
export function getRunnerHistory(bibNumber: string): MedicalRecord[] {
    return RECORDS.filter(r => r.bibNumber === bibNumber);
}

// Helper to count records per bib
export function getRecordCountByBib(): { [key: string]: { count: number; locations: Set<string> } } {
    const map: { [key: string]: { count: number; locations: Set<string> } } = {};
    RECORDS.forEach(r => {
        if (!map[r.bibNumber]) {
            map[r.bibNumber] = { count: 0, locations: new Set() };
        }
        map[r.bibNumber].count++;
        map[r.bibNumber].locations.add(r.location);
    });
    return map;
}
