# 📚Milidu - 국방 장병들을 위한 교육 정보 제공 서비스
📌 Front: Typescript + Next.js + SCSS  
📌 Back: Python Flask + sqlalchemy

## 📌 WorkFlow:
1) 국가기술자격증 정보: 자격증 정보 데이터는 비교적 변화가 적은 정적 데이터이기 때문에, 관련 공공 API를 통해 정보를 일괄 수집한 다음 데이터베이스에 등록한 후 사용자의 요청에 따라 정보를 가공하여 제시하는 식으로 설계하였습니다. 또한 사용자는 각 자격증 별로 시험 횟수, 공부 방법, 소요 기간, 사용 교재 등의 입력값을 포함한 합격 후기를 등록할 수 있습니다. 교재 검색은 국립중앙도서관의 도서 검색 API를 활용하였습니다.
2) 대학 원격 강좌 정보: 대학 원격 강좌 정보 역시 정적 데이터이기 때문에 관련 정보를 일괄적으로 데이터베이스에 등록한 후 사용자의 요청에 따라 알맞은 정보를 제공합니다. 사용자는 각 수업별로 수강 후기를 등록할 수 있습니다.

<video src="https://github.com/TaehyeungKim/milidu/assets/85505622/347c47bb-e81b-41a8-87b1-69ae963781f3"/>

<img width="1440" alt="스크린샷 2024-06-07 오전 3 24 24" src="https://github.com/TaehyeungKim/milidu/assets/85505622/07ca7fda-0d67-4539-a8e2-58b2233c711b">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 24 46" src="https://github.com/TaehyeungKim/milidu/assets/85505622/69777316-76bf-4805-a66d-d71ffdced58d">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 25 09" src="https://github.com/TaehyeungKim/milidu/assets/85505622/59b07559-a3ba-4f57-b257-c248525a5fc0">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 25 30" src="https://github.com/TaehyeungKim/milidu/assets/85505622/0b2a80f1-0477-44df-a0e1-8faacc3d0016">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 25 42" src="https://github.com/TaehyeungKim/milidu/assets/85505622/432d4112-d69e-47c4-9ae2-e458110a6115">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 25 55" src="https://github.com/TaehyeungKim/milidu/assets/85505622/51e954c2-eb45-4f2a-b8d6-81b6117c6dfe">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 26 07" src="https://github.com/TaehyeungKim/milidu/assets/85505622/fc32f2ed-4c52-46ef-a928-52e457017ad9">
<img width="1440" alt="스크린샷 2024-06-07 오전 3 26 21" src="https://github.com/TaehyeungKim/milidu/assets/85505622/c0d9c1bb-55f5-483f-97d5-ff19bfd6fd47">






## 😂아쉬운 점:
#### ✓ 서비스를 만들 당시 token을 이용한 사용자 인증 및 인가에 대한 개념이 명확히 정립되어 있지 않아, 탄탄한 사용자 인증 체계를 정립하지 못한 것이 아쉬워요. (당시에는 Context를 활용해 전역에서 User 정보를 일회성으로 관리하는 것으로 구현)  
#### ✓ 컴포넌트 구조화가 다소 복잡하게 되어있어 유지/보수에 상당한 어려움을 겪었습니다.  
#### ✓ Commit을 제때 제때 하자!! (마지막 수천 개의 코드 커밋이 사소한 UI 수정 Message로 통일되어 버린...😅)
