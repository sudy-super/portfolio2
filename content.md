# sudy 

## About Me
- **本名**: 須田楽大
- **年齢**: 18歳
- **性別**: 男

---

## Interests
- NLP
- Speed-up Runtime
- Reduce Memory Footprint

---

## Career
- 2022-04 ~ 2025-03 早稲田高等学校
- 2025-04 ~ 筑波大学 情報学群 情報科学類 

---

## Achievements

### 2024年度 (高3)
- 未踏ジュニア2024 採択 

### 2023年度 (高2)
- LOCAL AI HACKATHON #000 銅賞 

### 2022年度 (高1)
- 缶サット甲子園 2022 全国大会出場 

---

## Skills
### Programming Languages 
- Python
- C++
### Tools 
- PyTorch
- Docker
- Azure
### Experiences 
- LLMの事前学習、Fine-tuning、プロンプトエンジニアリング、RAGの開発をしたことがあります。
- LLMの事前学習・Fine-tuning向けデータセットの構築、収集経験があります。
- C++を用いた各種クリーニングによる数億件 (200b tokens)規模の高品質テキストコーパスの構築をしたことがあります。
- GPUノード間の通信最適化がちょっとできます。
- LLMの分散学習ができます。
  - Megatron-LM, gpt-neoxなどの既存学習フレームワークの仕組みを理解しています。
- PyTorchを用いたオリジナルアーキテクチャモデルの構築ができます。
- その他機械学習の基本的な知識があります。 

---
 

## Products 

### Malum-230 (2025-01-06) 
手作業で作成した高品質な事前学習・事後学習両用の論理推論データセット。
oasst2という一般的な対話データセットを用いた実験において、大規模言語モデル「Qwen2.5-7B」に対しMalumの追加の有無で比較学習を行い、論理的推論 (Reasoning)タスクの性能向上を実証。

[Link (Huggingface)](https://huggingface.co/datasets/Manual-Dataset-Creation-Project/Malum-230)

### Piece-of-Refined-OSCAR (2024-04-07) 
LLMの事前学習のテスト向けに160万件 (0.5b tokens)程度の小規模な日本語コーパスを構築。

[Link (Huggingface)](https://huggingface.co/datasets/sudy-super/piece-of-refined-oscar)

### Pret-a-Porter (2024-04-01) 
日本語Instruction-tuning/RLHFデータセット生成を目的として、既存データセットの高品質化および指示生成モデルと応答生成モデルの作成を行ったプロジェクト。
LOCAL AI HACKATHON #000にて銅賞を受賞。
既存データセットの高品質化と一部の学習コードの実装を担当。

[Link](https://imminent-land-e64.notion.site/e569abd90c3f4f0586fa03e9d080193d?p=0d59f729b7444fa88b6ab1c5d232ea6e&pm=s)

[Link (Huggingface)](https://huggingface.co/datasets/sudy-super/oasst2-chat-5k-ja)

### JetCopper-10B (2024-03-22) 
LLMの事前学習のテスト用に1600万件 (10b tokens)程度の小規模な日本語・英語・コード混合のコーパスを構築。

[Link (Huggingface)](https://huggingface.co/datasets/sudy-super/JetCopper-10B)

### MoEモデルの事前学習に最適化した学習フレームワーク 
NDAにより非公開。

### Baku (2024-01-09) 
大規模言語モデル「CALM2-7b」の同じ層を再利用することによりパラメータを増やしたモデル。
- 1~24層、8~32層をslerpマージしたbaku-10b
- 1~16層x1、8~24層x2、16~32層x1をpassthroughマージしたbaku-13b
- 同構成でslerpマージしたbaku-13b-v2
を作成。

[Link (huggingface)](https://huggingface.co/sudy-super/baku-10b)

### Sentinel (2023-11-15) 
多言語対応のプロンプトインジェクション判定器。
原理的にハックされることがないため、対話モデルの前段に配置することで既存LLMのプロンプトを操作する事に比べて効果的にプロンプトインジェクションやジェイルブレイクを防止可能。
Meta社のLlama Guardの45倍小規模なため低レイテンシで動作する。

[Link (Huggingface)](https://huggingface.co/sudy-super/Sentinel)

### AutoMATA (2023-09-06) 
LLMに能動的推論機能と疑似意識を実装するツール。
人間に近い思考を再現することで素のLLMより高い問題解決・対話能力を発揮可能。

[Link (Github)](https://github.com/sudy-super/AutoMATA)

### CoTangent (2023-07-04) 
手作業で作成した高品質な100件の日本語CoTデータセット。

[Link (Huggingface)](https://huggingface.co/datasets/sudy-super/CoTangent)

### SudyIndex (2023-06-14) 
AITuber等のAIキャラクターに特化した記憶・想起システム。

[Link (Github)](https://github.com/sudy-super/SudyIndex)

## Blog 
【出願RTA】社不が筑波大学情報科学類のAC入試を受験するとどうなるのか？(合格体験記)

[Link (Note)](https://note.com/sudy_super/n/nfdef95c9c403)

【Morphological Inflection】国際人工知能オリンピックのサンプル問題を解いてみた！

[Link (Zenn)](https://zenn.dev/sudy_super/articles/8bb74682009ff0)

## Intern / Part-time 

### Research Intern @ [PKSHA Technology Inc.](https://pkshatech.com) 
September 2025 - Present

### Research Intern @ [Turing Inc.](https://tur.ing/) 
August 2025 - September 2025

### Machine Learning Engineer @ [ReAlice Inc.](https://realice.jp/) 
August 2023 - January 2024

### Backend Engineer @ [Pictoria Inc.](https://www.pictoria.co.jp/) 
July 2023 - September 2023

---

## Social
| サービス | アカウント |
|:---|:---|:---|
| Zenn | [@sudy_super](https://zenn.dev/sudy_super) |
| Note | [@sudy_super](https://note.com/sudy_super) |
| GitHub | [@sudy-super](https://github.com/sudy-super) |
| Huggingface | [@sudy-super](https://huggingface.co/sudy-super) |
| Twitter | [@sudy_super](https://twitter.com/sudy_super) |

---

## Contact

hello@sudy.me