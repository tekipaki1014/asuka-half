// ===== Types =====
export interface MedicalRecord {
    id: string;
    location: string;
    staffName: string;
    timestamp: string;
    bibNumber: string;
    injury: string;
    status: string;
    ambulance: boolean;
    returnToRace: boolean;
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
}

export interface Staff {
    name: string;
    furigana: string;
    role: string;
    qualification: string;
}

// ===== スタッフマスタ (from CSV) =====
export const STAFF_MASTER: Staff[] = [
    { name: "和田D", furigana: "ワダディー", role: "本部", qualification: "Dr" },
    { name: "安藤AT", furigana: "アンドウエーティー", role: "本部", qualification: "AT" },
    { name: "西澤AT", furigana: "ニシザワエーティー", role: "本部", qualification: "AT" },
    { name: "福本AT", furigana: "フクモトエーティー", role: "本部", qualification: "AT" },
    { name: "羽角Dr", furigana: "ハスミドクター", role: "第1", qualification: "Dr" },
    { name: "西村Ns", furigana: "ニシムラナース", role: "第1", qualification: "Ns" },
    { name: "あああ", furigana: "アアア", role: "その他", qualification: "行政" },
    { name: "いいい", furigana: "イイイ", role: "その他", qualification: "行政" },
    { name: "ううう", furigana: "ウウウ", role: "その他", qualification: "行政" },
    { name: "えええ", furigana: "エエエ", role: "その他", qualification: "行政" },
    { name: "おおお", furigana: "オオオ", role: "その他", qualification: "行政" },
];

// ===== ランナーマスタ (from CSV) =====
export const RUNNER_MASTER: { [key: string]: Runner } = {
    "1": { bibNumber: "1", name: "佐藤太郎", furigana: "サトウタロウ", address: "奈良県奈良市1丁目2-1", participationCount: 3, phone: "090-4996-6328", emergencyContact: "080-2031-4130", hasSupport: false },
    "2": { bibNumber: "2", name: "鈴木花子", furigana: "スズキハナコ", address: "大阪府生駒市2丁目3-2", participationCount: 3, phone: "090-2550-4871", emergencyContact: "080-6200-2366", hasSupport: true },
    "3": { bibNumber: "3", name: "高橋健一", furigana: "タカハシケンイチ", address: "京都府橿原市3丁目4-3", participationCount: 0, phone: "090-6234-8260", emergencyContact: "080-1806-3231", hasSupport: true },
    "4": { bibNumber: "4", name: "田中美咲", furigana: "タナカミサキ", address: "兵庫県天理市4丁目5-1", participationCount: 4, phone: "090-1761-5528", emergencyContact: "080-8521-1047", hasSupport: false },
    "5": { bibNumber: "5", name: "伊藤翔太", furigana: "イトウショウタ", address: "三重県大和郡山市5丁目6-2", participationCount: 2, phone: "090-4350-8815", emergencyContact: "080-8253-9541", hasSupport: true },
    "6": { bibNumber: "6", name: "山本愛", furigana: "ヤマモトアイ", address: "和歌山県桜井市6丁目7-3", participationCount: 4, phone: "090-9704-8058", emergencyContact: "080-2963-4550", hasSupport: false },
    "7": { bibNumber: "7", name: "中村大輔", furigana: "ナカムラダイスケ", address: "奈良県奈良市7丁目8-1", participationCount: 2, phone: "090-3492-9808", emergencyContact: "080-7462-4592", hasSupport: false },
    "8": { bibNumber: "8", name: "小林彩香", furigana: "コバヤシアヤカ", address: "大阪府生駒市8丁目9-2", participationCount: 3, phone: "090-6971-8332", emergencyContact: "080-1370-9121", hasSupport: true },
    "9": { bibNumber: "9", name: "加藤直樹", furigana: "カトウナオキ", address: "京都府橿原市9丁目10-3", participationCount: 0, phone: "090-6865-3824", emergencyContact: "080-4897-7855", hasSupport: false },
    "10": { bibNumber: "10", name: "吉田麻衣", furigana: "ヨシダマイ", address: "兵庫県天理市10丁目11-1", participationCount: 3, phone: "090-6008-6410", emergencyContact: "080-5635-9181", hasSupport: false },
    "11": { bibNumber: "11", name: "山田悠人", furigana: "ヤマダユウト", address: "三重県大和郡山市11丁目12-2", participationCount: 0, phone: "090-3079-9676", emergencyContact: "080-2632-5254", hasSupport: true },
    "12": { bibNumber: "12", name: "佐々木さくら", furigana: "ササキサクラ", address: "和歌山県桜井市12丁目13-3", participationCount: 2, phone: "090-6414-7130", emergencyContact: "080-3583-6940", hasSupport: true },
    "13": { bibNumber: "13", name: "山口裕子", furigana: "ヤマグチユウコ", address: "奈良県奈良市13丁目14-1", participationCount: 4, phone: "090-4669-3667", emergencyContact: "080-6983-4775", hasSupport: false },
    "14": { bibNumber: "14", name: "松本誠", furigana: "マツモトマコト", address: "大阪府生駒市14丁目15-2", participationCount: 4, phone: "090-5131-5455", emergencyContact: "080-8430-1026", hasSupport: true },
    "15": { bibNumber: "15", name: "井上結衣", furigana: "イノウエユイ", address: "京都府橿原市15丁目16-3", participationCount: 4, phone: "090-5840-5284", emergencyContact: "080-9667-2166", hasSupport: false },
    "16": { bibNumber: "16", name: "木村亮介", furigana: "キムラリョウスケ", address: "兵庫県天理市16丁目17-1", participationCount: 5, phone: "090-4219-3420", emergencyContact: "080-9555-2922", hasSupport: true },
    "17": { bibNumber: "17", name: "林恵", furigana: "ハヤシメグミ", address: "三重県大和郡山市17丁目18-2", participationCount: 5, phone: "090-7272-3948", emergencyContact: "080-5871-5157", hasSupport: false },
    "18": { bibNumber: "18", name: "斎藤航", furigana: "サイトウワタル", address: "和歌山県桜井市18丁目19-3", participationCount: 5, phone: "090-1700-1012", emergencyContact: "080-6028-1505", hasSupport: false },
    "19": { bibNumber: "19", name: "清水奈々", furigana: "シミズナナ", address: "奈良県奈良市19丁目20-1", participationCount: 4, phone: "090-6200-3327", emergencyContact: "080-4334-2505", hasSupport: false },
    "20": { bibNumber: "20", name: "山崎修平", furigana: "ヤマザキシュウヘイ", address: "大阪府生駒市20丁目21-2", participationCount: 1, phone: "090-4213-2241", emergencyContact: "080-7510-5490", hasSupport: true },
    "21": { bibNumber: "21", name: "阿部真由", furigana: "アベマユ", address: "京都府橿原市21丁目22-3", participationCount: 4, phone: "090-2638-1902", emergencyContact: "080-9888-5500", hasSupport: false },
    "22": { bibNumber: "22", name: "森徹", furigana: "モリトオル", address: "兵庫県天理市22丁目23-1", participationCount: 0, phone: "090-9228-7739", emergencyContact: "080-6848-1595", hasSupport: false },
    "23": { bibNumber: "23", name: "池田千尋", furigana: "イケダチヒロ", address: "三重県大和郡山市23丁目24-2", participationCount: 1, phone: "090-3817-3169", emergencyContact: "080-4424-2913", hasSupport: false },
    "24": { bibNumber: "24", name: "橋本拓海", furigana: "ハシモトタクミ", address: "和歌山県桜井市24丁目25-3", participationCount: 2, phone: "090-4576-1545", emergencyContact: "080-9193-4562", hasSupport: false },
    "25": { bibNumber: "25", name: "山下唯", furigana: "ヤマシタユイ", address: "奈良県奈良市25丁目26-1", participationCount: 4, phone: "090-9077-7185", emergencyContact: "080-1323-9357", hasSupport: false },
    "26": { bibNumber: "26", name: "石川達也", furigana: "イシカワタツヤ", address: "大阪府生駒市26丁目27-2", participationCount: 2, phone: "090-7679-9973", emergencyContact: "080-6366-1005", hasSupport: false },
    "27": { bibNumber: "27", name: "中島芽衣", furigana: "ナカジマメイ", address: "京都府橿原市27丁目28-3", participationCount: 3, phone: "090-5183-5000", emergencyContact: "080-8473-4968", hasSupport: true },
    "28": { bibNumber: "28", name: "前田浩二", furigana: "マエダコウジ", address: "兵庫県天理市28丁目29-1", participationCount: 0, phone: "090-7959-3529", emergencyContact: "080-2290-4464", hasSupport: true },
    "29": { bibNumber: "29", name: "藤田絵里", furigana: "フジタエリ", address: "三重県大和郡山市29丁目30-2", participationCount: 3, phone: "090-8671-7330", emergencyContact: "080-7303-8643", hasSupport: true },
    "30": { bibNumber: "30", name: "小川淳", furigana: "オガワジュン", address: "和歌山県桜井市30丁目31-3", participationCount: 1, phone: "090-8043-8754", emergencyContact: "080-3077-9732", hasSupport: false },
};

// ===== 対応記録 (from CSV) =====
// Convert timestamp to time-only for display
function parseTime(dateStr: string): string {
    const parts = dateStr.split(' ');
    if (parts.length > 1) {
        return parts[1].substring(0, 5); // HH:MM
    }
    return dateStr;
}

export const RECORDS: MedicalRecord[] = [
    { id: "1", location: "第1", staffName: "スタッフ1", timestamp: "09:00", bibNumber: "1", injury: "足関節捻挫", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "2", location: "第2", staffName: "スタッフ2", timestamp: "09:03", bibNumber: "2", injury: "膝痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "3", location: "第3", staffName: "スタッフ3", timestamp: "09:06", bibNumber: "3", injury: "下腿筋痙攣", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "4", location: "フィニッシュ", staffName: "スタッフ4", timestamp: "09:09", bibNumber: "4", injury: "熱中症疑い", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "5", location: "本部", staffName: "スタッフ5", timestamp: "09:12", bibNumber: "5", injury: "擦過傷", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "6", location: "AED隊", staffName: "スタッフ6", timestamp: "09:15", bibNumber: "6", injury: "足底痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "7", location: "その他", staffName: "スタッフ7", timestamp: "09:18", bibNumber: "7", injury: "腰痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "8", location: "第1", staffName: "スタッフ8", timestamp: "09:21", bibNumber: "8", injury: "疲労困憊", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "9", location: "第2", staffName: "スタッフ9", timestamp: "09:24", bibNumber: "9", injury: "嘔気", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "10", location: "第3", staffName: "スタッフ10", timestamp: "09:27", bibNumber: "10", injury: "頭痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "11", location: "フィニッシュ", staffName: "スタッフ11", timestamp: "09:30", bibNumber: "11", injury: "軽度脱水", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "12", location: "本部", staffName: "スタッフ12", timestamp: "09:33", bibNumber: "12", injury: "足趾水疱", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "13", location: "AED隊", staffName: "スタッフ13", timestamp: "09:36", bibNumber: "13", injury: "シンスプリント疑い", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "14", location: "その他", staffName: "スタッフ14", timestamp: "09:39", bibNumber: "14", injury: "背部痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "15", location: "第1", staffName: "スタッフ15", timestamp: "09:42", bibNumber: "15", injury: "転倒による擦過傷", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "16", location: "第2", staffName: "スタッフ16", timestamp: "09:45", bibNumber: "16", injury: "大腿後面筋痛", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "17", location: "第3", staffName: "スタッフ17", timestamp: "09:48", bibNumber: "17", injury: "ふくらはぎ痙攣", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "18", location: "フィニッシュ", staffName: "スタッフ18", timestamp: "09:51", bibNumber: "18", injury: "胸苦しさ訴え", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "19", location: "本部", staffName: "スタッフ19", timestamp: "09:54", bibNumber: "19", injury: "呼吸苦軽度", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "20", location: "AED隊", staffName: "スタッフ20", timestamp: "09:57", bibNumber: "20", injury: "心拍上昇", status: "現場確認・問診実施", ambulance: false, returnToRace: true },
    { id: "21", location: "第1", staffName: "本部記録1", timestamp: "10:00", bibNumber: "21", injury: "ふくらはぎ違和感", status: "ストレッチ指導", ambulance: false, returnToRace: true },
    { id: "22", location: "第2", staffName: "本部記録2", timestamp: "10:04", bibNumber: "21", injury: "下腿筋痙攣", status: "冷却・補水", ambulance: true, returnToRace: true },
    { id: "23", location: "第3", staffName: "本部記録3", timestamp: "10:08", bibNumber: "21", injury: "下腿筋痙攣増悪", status: "圧迫・テーピング", ambulance: true, returnToRace: true },
    { id: "24", location: "本部", staffName: "本部記録4", timestamp: "10:12", bibNumber: "21", injury: "体温上昇", status: "問診と水分補給", ambulance: false, returnToRace: true },
    { id: "25", location: "AED隊", staffName: "本部記録5", timestamp: "10:16", bibNumber: "21", injury: "胸部不快感訴え", status: "心電図簡易評価", ambulance: true, returnToRace: true },
    { id: "26", location: "フィニッシュ", staffName: "本部記録6", timestamp: "10:20", bibNumber: "21", injury: "強い疲労感", status: "座位休息", ambulance: false, returnToRace: true },
    { id: "27", location: "その他", staffName: "本部記録7", timestamp: "10:24", bibNumber: "21", injury: "軽度頭痛", status: "冷却・補水追加", ambulance: false, returnToRace: true },
    { id: "28", location: "第1", staffName: "本部記録8", timestamp: "10:28", bibNumber: "21", injury: "左下腿痛再燃", status: "アイシング再施行", ambulance: false, returnToRace: true },
    { id: "29", location: "第2", staffName: "本部記録9", timestamp: "10:32", bibNumber: "21", injury: "歩行時痛", status: "再診評価", ambulance: false, returnToRace: true },
    { id: "30", location: "本部", staffName: "本部記録10", timestamp: "10:36", bibNumber: "21", injury: "痛み持続", status: "最終判断会議", ambulance: true, returnToRace: false },
];

// Helper to get runner info
export function getRunner(bibNumber: string): Runner | undefined {
    return RUNNER_MASTER[bibNumber];
}

// Helper to get records for a specific runner
export function getRunnerHistory(bibNumber: string): MedicalRecord[] {
    return RECORDS.filter(r => r.bibNumber === bibNumber);
}
