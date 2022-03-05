# 프로젝트 설명
Development 환경을 Window OS에서 Nginx와 함께 구동할 수 있고

Production을 Ubuntu 18.02의 docker-compose로 Nginx와 함께 배포할 수 있는 개발 환경입니다.

Frontend는 React로 구성되어있으며

React는 서버 컨트롤러 폴더 안의 프론트빌드.bat를 실행시킬경우 서버의 public에

빌드되어 즉각적으로 반영될 수 있습니다.

TS가 적용되어있어 TS를 즉시 도입하여 서버를 개발할 수 있고

SCSS 가 적용되어있습니다.

##테스트용 계정
| ID | PWD |
| ----- | ----- |
| qa0 | qa0 |

# 환경 설정
| 프로그램 | 버전 |
| ------ | ------ |
| Node.js | v14.15 |
| npm | v6.14.8 |
| React.js | v17.0.2 |

# 빌드 및 실행
## Window
### Back End
- 서버 컨트롤러 폴더 안의 서버 안켜질때 실행.bat을 실행
- 서버 열기.bat 파일 실행
### Front End
- 서버 컨트롤러 폴더 안의 프론트 안켜질때 실행.bat을 실행
- 프론트 열기.bat 파일 실행

### Front End Build
- 서버 컨트롤러 폴더 안의 프론트 빌드.bat 실행

# 데이터베이스
Mysql 기반이며 SQL폴더의 sql을 로컬 DB에 실행하면됩니다.

# 서버 주소
### Front End Server
- http://localhost:8080
### Back End Server
- http://localhost:8081

# 커밋 타입
| 키워드 | 설명 |
| ------ | ------ |
|feat | 새로운 기능 |
|fix | 버그 수정|
|refactor | 리팩토링|
|style | 코드 형식, 정렬, 주석 등 동작에 영향을 안주는 변경사항|
|test | 테스트 코드 관련 내용|
|docs | 문서 수정 (제품 코드 수정 X)|
|etc | 이외 위에서 해당하지 않는 모든 수정사항|  
