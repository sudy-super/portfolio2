export interface Work {
  id: string;
  year: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  link?: string;
  linkType?: 'github' | 'huggingface' | 'notion' | 'external';
  thumbnailUrl?: string;
}

export const works: Work[] = [
  {
    id: 'malum-230',
    year: 2025,
    title: 'Malum-230',
    shortDescription: '高品質な論理推論データセット',
    longDescription: '手作業で作成した高品質な事前学習・事後学習両用の論理推論データセット。oasst2という一般的な対話データセットを用いた実験において、大規模言語モデル「Qwen2.5-7B」に対しMalumの追加の有無で比較学習を行い、論理的推論 (Reasoning)タスクの性能向上を実証。',
    link: 'https://huggingface.co/datasets/Manual-Dataset-Creation-Project/Malum-230',
    linkType: 'huggingface',
  },
  {
    id: 'piece-of-refined-oscar',
    year: 2024,
    title: 'Piece-of-Refined-OSCAR',
    shortDescription: '小規模日本語コーパス',
    longDescription: 'LLMの事前学習のテスト向けに160万件 (0.5b tokens)程度の小規模な日本語コーパスを構築。',
    link: 'https://huggingface.co/datasets/sudy-super/piece-of-refined-oscar',
    linkType: 'huggingface',
  },
  {
    id: 'pret-a-porter',
    year: 2024,
    title: 'Pret-a-Porter',
    shortDescription: '日本語Instruction-tuningデータセット',
    longDescription: '日本語Instruction-tuning/RLHFデータセット生成を目的として、既存データセットの高品質化および指示生成モデルと応答生成モデルの作成を行ったプロジェクト。LOCAL AI HACKATHON #000にて銅賞を受賞。',
    link: 'https://huggingface.co/datasets/sudy-super/oasst2-chat-5k-ja',
    linkType: 'huggingface',
  },
  {
    id: 'jetcopper-10b',
    year: 2024,
    title: 'JetCopper-10B',
    shortDescription: '日英コード混合コーパス',
    longDescription: 'LLMの事前学習のテスト用に1600万件 (10b tokens)程度の小規模な日本語・英語・コード混合のコーパスを構築。',
    link: 'https://huggingface.co/datasets/sudy-super/JetCopper-10B',
    linkType: 'huggingface',
  },
  {
    id: 'baku',
    year: 2024,
    title: 'Baku',
    shortDescription: 'CALM2-7b拡張モデル',
    longDescription: '大規模言語モデル「CALM2-7b」の同じ層を再利用することによりパラメータを増やしたモデル。slerpマージやpassthroughマージを用いてbaku-10b、baku-13b、baku-13b-v2を作成。',
    link: 'https://huggingface.co/sudy-super/baku-10b',
    linkType: 'huggingface',
  },
  {
    id: 'sentinel',
    year: 2023,
    title: 'Sentinel',
    shortDescription: '多言語プロンプトインジェクション判定器',
    longDescription: '多言語対応のプロンプトインジェクション判定器。原理的にハックされることがないため、対話モデルの前段に配置することで効果的にプロンプトインジェクションやジェイルブレイクを防止可能。Meta社のLlama Guardの45倍小規模なため低レイテンシで動作する。',
    link: 'https://huggingface.co/sudy-super/Sentinel',
    linkType: 'huggingface',
  },
  {
    id: 'automata',
    year: 2023,
    title: 'AutoMATA',
    shortDescription: 'LLM能動的推論ツール',
    longDescription: 'LLMに能動的推論機能と疑似意識を実装するツール。人間に近い思考を再現することで素のLLMより高い問題解決・対話能力を発揮可能。',
    link: 'https://github.com/sudy-super/AutoMATA',
    linkType: 'github',
  },
  {
    id: 'cotangent',
    year: 2023,
    title: 'CoTangent',
    shortDescription: '日本語CoTデータセット',
    longDescription: '手作業で作成した高品質な100件の日本語CoTデータセット。',
    link: 'https://huggingface.co/datasets/sudy-super/CoTangent',
    linkType: 'huggingface',
  },
  {
    id: 'sudyindex',
    year: 2023,
    title: 'SudyIndex',
    shortDescription: 'AIキャラクター記憶システム',
    longDescription: 'AITuber等のAIキャラクターに特化した記憶・想起システム。',
    link: 'https://github.com/sudy-super/SudyIndex',
    linkType: 'github',
  },
];
