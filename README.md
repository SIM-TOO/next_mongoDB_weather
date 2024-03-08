# Next.js-mongoDB-weather
1. MongoDB를 활용한 로그인/회원가입 기능이 있는 weather 웹사이트
- .env 파일에 MONGODB_URI = 몽고DB연결URL 작성과 몽고DB의 환경 설정을 합니다.


2. 사용한 라이브러리
- bcryptjs
- mongodb
- Next Auth

3. .env 파일
-MONGODB_URI = {몽고DB연결 URL}
-NEXT_PUBLIC_OPENWEATHER_API_KEY = {OPENWEATHER API값}

4. tailwind.config 작성 추가 내용
-  backgroundImage, colors, backdropBlur

<button onclick="copyCode()">복사</button>
<pre><code id="codeBlock">
 theme: {
    extend: {
      backgroundImage: {
        main: "url('../public/clouds-bg.svg')",
        filter: "url(../public/Rectangle.svg)",
        elgoli: "url(../public/elgoli.svg)",
        tempLow: "url('../public/pexels-lumn.jpg')",
        tempHigh: "url('../public/white-cloud-blue-sky.jpg')",
      },
      backgroundColor: {
        box: "rgba(255, 255, 255, 0.1)",
        card: "rgba(29,55,76, .95)",
      },
      colors: {
        primary: "#EDBA4F",
        gray: "rgba(255, 255, 255, 0.2)",
      },
      backdropBlur: {
        "4xl": "100px",
      },
    },
  },
</code></pre>
