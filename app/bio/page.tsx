import { Metadata } from "next";

export default function Bio() {
  return (
    <main className="">
      <div>《経歴》</div>
      <section
        className="grid grid-cols-2 gap-2 w-full md:w-[720px]"
        style={{ gridTemplateColumns: "60px 1fr" }}
      >
        <Row
          year="2023年"
          text="東京芸術大学大学院美術研究科先端芸術表現専攻卒業。"
        />
        <Row year="2020年" text="Yogo Management Office 合同会社設立。" />
        <Row
          year="2019年"
          text="東京芸術大学大学院美術研究科先端芸術表現専攻入学。"
        />
        <Row year="2018年" text="フリーランスエンジニアとして仕事を始める。" />
        <Row year="2018年" text="東京芸術大学音楽学部作曲科卒業。" />
        <Row
          year="2015年"
          text="作曲科在学中からプログラミングを始め、アルゴリズミックな作曲を研究。"
        />
        <Row year="2013年" text="東京芸術大学音楽学部作曲科入学。" />
        <Row year="2009年" text="米国イリノイ州に1年間高校留学。" />
        <Row year="1992年" text="東京にて生まれる。" />
      </section>
      <section className="leading-8 my-8">
        <div>
          <div>《賞歴》</div>
          <ul>
            <li>第1期 クマ財団奨学生 採択</li>
            <li>第31回 現音作曲新人賞 第1位/聴衆賞</li>
            <li>第19回 東京国際室内楽作曲コンクール 入選</li>
            <li>第15回 TIAA全日本作曲コンクール室内楽部門 審査員賞</li>
          </ul>
        </div>
        <div className="mt-4">
          <div>《語学資格等》</div>
          <div>
            英語
            <ul>
              <li>TOEIC Listening & Writing Test: 950/990</li>
              <li>EC SET: C2 Proficient</li>
            </ul>
          </div>
          <div>
            中国語
            <ul>
              <li>HSK 5級: 185点</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({ year, text }: { year: string; text: string }) {
  return (
    <>
      <div className="flex items-center">
        <span>{year}</span>
      </div>
      <p>{text}</p>
    </>
  );
}

export const metadata: Metadata = {
  title: "Bio",
  description: "Biography of Yuichi Yogo",
};
