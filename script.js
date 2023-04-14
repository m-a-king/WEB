window.onload = () => {
  /*
   * 메뉴 이동
   */
  const snapSections = document.querySelectorAll("section");
  const nav = document.querySelector(".nav");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const links = document.querySelectorAll(".nav li a");
  let currentSection = 0;
  let menu = null;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // 중간 지점에서 감지
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 이전 메뉴 `active` 클래스 제거
        menu = document.querySelector("#menu-" + currentSection);
        menu.classList.remove("active");

        // 현재 섹션 ID를 얻음
        currentSection = parseInt(entry.target.id.split("-")[1]);

        // 현재 섹션 ID를 얻음
        nav.style.marginTop = -28 - 35 * currentSection + "px";

        // 현재 메뉴 `active` 클래스 추가
        menu = document.querySelector("#menu-" + currentSection);
        menu.classList.add("active");

        if (currentSection == 2 || currentSection == 4) {
          header.style.color = "black";
          footer.style.color = "black";
          for (let link of links) {
            link.style.color = "black";
          }
        } else {
          header.style.color = "white";
          footer.style.color = "white";
          for (let link of links) {
            link.style.color = "white";
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  snapSections.forEach((section) => observer.observe(section));

  /*
   * 텍스트 타이핑
   */
  const open = document.querySelector(".open");
  const close = document.querySelector(".close");
  const words = ["조재중", "Making"];
  const sentence =
    'URL 한 줄로 나를 설명할 수 있게 되는 그 날을 위해서,  "MAKING"';
  const speed = 100;
  let i = 0;

  // 시작 텍스트 타이핑
  const openTyping = async () => {
    const letter = words[i].split("");

    while (letter.length) {
      await wait(speed);
      open.innerHTML += letter.shift();
    }

    // 대기
    await wait(800);

    // 텍스트 제거
    openRemove();
  };

  // 시작 텍스트 제거
  const openRemove = async () => {
    const letter = words[i].split("");

    while (letter.length) {
      await wait(speed);

      letter.pop();
      open.innerHTML = letter.join("");
    }

    // 텍스트 타이핑
    i = !words[i + 1] ? 0 : i + 1;
    openTyping();
  };

  // 끝 텍스트 타이핑
  const closeTyping = async () => {
    let letter = sentence.split("");

    while (letter.length) {
      await wait(speed);
      close.innerHTML += letter.shift();
    }

    // 대기
    await wait(2000);

    // 텍스트 제거
    closeRemove();
  };

  // 끝 텍스트 제거
  const closeRemove = async () => {
    let letter = sentence.split("");

    while (letter.length) {
      await wait(speed);

      letter.pop();
      close.innerHTML = letter.join("");
    }

    closeTyping();
  };

  // 딜레이
  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // 타이핑 실행
  setTimeout(openTyping, 1500);
  setTimeout(closeTyping, 1500);
};
