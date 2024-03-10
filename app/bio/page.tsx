export default function Bio() {
  return (
    <div>
      <section className="grid grid-cols-2 gap-4">
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
    </div>
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
