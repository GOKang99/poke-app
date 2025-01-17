# 🐾 포켓몬 도감 웹 앱

포켓몬의 세계를 탐험하고 즐길 수 있는 직관적이고 사용자 친화적인 웹 애플리케이션입니다. 최신 웹 개발 도구를 사용하여 개발되었으며, 포켓몬 API의 데이터를 통해 매끄러운 상호작용을 제공합니다.

---

## 🌟 주요 기능

- 🔍 **포켓몬 검색**: 원하는 포켓몬을 빠르게 검색할 수 있습니다.
- 📋 **포켓몬 상세 정보**: 타입, 능력치, 특성을 포함한 다양한 정보를 확인하세요.
- 🧩 **퀴즈**: 재미있는 퀴즈로 포켓몬에 대한 지식을 테스트해 보세요.
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 최적화된 UI를 제공합니다.

---

## 🛠️ 사용된 기술 스택

- **React**: 컴포넌트 기반의 UI 개발.
- **Vite**: 빠른 개발 서버 및 빌드 도구.
- **Tailwind CSS**: 반응형과 모던한 스타일링을 위해 사용.
- **React Router**: 페이지 간 네비게이션과 라우팅 관리.
- **Fetch API**: 포켓몬 API에서 데이터를 가져오기 위한 HTTP 요청 처리.

---

## 📂 프로젝트 구조

## 📂 프로젝트 구조

- **src/**
  - **components/**: 재사용 가능한 UI 컴포넌트
  - **pages/**: 애플리케이션 페이지
  - **styles/**: 전역 및 컴포넌트 스타일
  - **assets/**: 이미지 및 정적 자산
  - **App.jsx**: 메인 애플리케이션 파일
  - **index.jsx**: 애플리케이션 진입점

🎨 시행 영상
영상

## 🚀 배포

이 애플리케이션은 다음 링크에서 확인할 수 있습니다:

- [포켓몬 도감 웹 앱](https://pokemongame123.netlify.app/

## 📈 향후 개선 사항

- 나만의 포켓몬 추가.
- AI와 배틀
- 다국어 지원

## 💡 학습 포인트

- React와 Tailwind CSS를 활용한 반응형 UI 설계.
- Fetch API로 외부 API와의 비동기 통신 구현.
- Vite를 사용해 빠른 개발 환경 구축

## 😅 어려웠던 점 및 해결 방법

- **문제**: API 호출 제한으로 인해 한 번에 1000개의 데이터를 받아올 수 없었습니다. 이는 API 제공자의 호출 제한 정책에 따라 발생한 문제였습니다.
- **해결 방법**: Batch 처리 방식을 도입하여 데이터를 50개씩 나누어 순차적으로 호출하는 기능을 구현했습니다. 이를 통해 API 호출 제한을 준수하면서도 필요한 데이터를 모두 받아올 수 있었습니다.

**코드 구현 예시**:

```javascript
const fetchPokemonData = async () => {
  const batchSize = 50;
  const totalPokemons = 1000;
  let allPokemons = [];

  for (let i = 0; i < totalPokemons; i += batchSize) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=${batchSize}`
    );
    const data = await response.json();
    allPokemons = [...allPokemons, ...data.results];
  }

  return allPokemons;
};


## 🔧 개발 환경

- Node.js: 16.x 이상
- npm: 8.x 이상
- React: 18.x

📞 문의
문의나 피드백은 아래로 연락 주세요:

이메일: justletomer@gmail.com
GitHub: GOKANG99
```
