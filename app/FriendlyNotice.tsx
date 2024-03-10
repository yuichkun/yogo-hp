export function FriendlyNotice() {
  return (
    <div tabIndex={0} className="collapse bg-info-content">
      <div className="collapse-title text-xl font-medium">
        For those who doesn't read Japanese 🇯🇵
      </div>
      <div className="collapse-content">
        Hey there! Just a heads up, the site's in Japanese for now. <br />
        Feel free to use your browser’s translation tool, <br />
        or why not take this as a cool opportunity to dive into learning 🇯🇵?
        <br />
        I might add more languages down the line. <br />
        <br />
        Thanks!
      </div>
    </div>
  );
}
