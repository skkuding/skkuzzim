# SKKUDING Contributing Guide

SKKUDING에 contribution 해주셔서 감사합니다! 이 글은 contribute 시 따라야 할 지침을 설명합니다. 이 글을 읽기 전, 기본적인 행동 지침을 이해하기 위해 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)를 읽어주세요.

## 개발 환경 설정 ⚙️

### 공통
- 패키지 매니저로 pnpm을 사용합니다. pnpm을 먼저 설치해주세요.
  - npm이 설치되어 있다면 `npm install -g pnpm`으로 설치가 가능합니다.
  - 그 외의 방법은 [여기](https://pnpm.io/ko/installation)를 참고하세요.
- pnpm을 설치했다면 `pnpm i`로 패키지를 설치해주세요.

### VSCODE 설정
- Recommended vscode extension을 전부 설치해주세요.

### Backend
- Prerequisites
  - Node.js >=18

- DB Setting
  - docker가 설치되어 있어야 합니다.
  - docker-compose.yml이 있는 위치에서 `docker compose up`을 실행합니다.
  - 위 명령어로 postgreSQL 15 서버를 컨테이너로 띄워 접속할 수 있습니다.
  - `docker compose down`으로 컨테이너를 내릴 수 있으나, DB 안의 데이터가 다 지워지니 주의하세요.
  - `npx prisma studio`로 간단한 데이터는 DB에 직접 CRUD할 수 있습니다.
  - 실행중인 컨테이너는 vscode docker extension을 설치하시면 쉽게 확인하실 수 있습니다.



## Issue(ticket) 🎫

- Issue는 모든 업무의 기본 단위입니다.
- 어떠한 작업이든 작업 전에 해당 내용을 issue로 등록합니다.
- 기존에 올라온 issue와 중복되지 않았는지 확인 후 등록합니다.
- 버그 등록 시 reproduction 방법을 구체적으로 적습니다.
- Issue 내용은 template에 따라 작성합니다.
- 구현 방법보다는 구현 동기와 이유를 중심으로 작성합니다.

## <a name="pr-and-branch"></a> Pull Request & Branch 🌲

### `main` branch

- `main` branch의 모든 commit은 PR과 1대1로 매치되어야 합니다. (squash and merge 사용)
- 각 commit은 논리적으로 구분되는 최소 단위로 작성합니다. 즉, PR 작성 시점에 이를 고려해야 합니다.
- 각 commit의 코드는 완전해야 합니다. 기능의 일부분만 구현하거나 테스트를 통과하지 못하는 코드가 있으면 안됩니다.

### Pull Request

- 하나의 PR은 한 개 이상의 issue를 해결해야 합니다.
- PR을 squash and merge할 경우 PR이 곧 commit이므로 PR의 제목은 [commit convention](#commit-convention)을 따라야 합니다.
- 각 PR의 코드 수정량은 300줄 이하로 합니다. (단, `feat` branch 예외)
- 기능을 구현하거나 버그를 수정하는 PR은 해당 내용에 대한 테스트를 포함해야 합니다. PR 이전에는 통과되지 않는 테스트면 더 좋습니다.
- PR의 설명문 마지막에 `Closes #0000` 키워드를 이용해 해결한 issue를 연결합니다.
- 버그를 수정하는 PR은 제목의 마지막에 `(fix #0000)`을 덧붙입니다.
- 모든 PR은 squash and merge를 기본으로 합니다. 따라서 PR에 사소한 수정사항이 생겼을 때 amend와 force push를 사용하는 대신, 별도의 commit을 만드는 것을 권장합니다. (어차피 squash하면 사라지니까요!)

### Branch

- Branch의 이름은 `<issue>-<name>` 형식으로 짓습니다. 모든 글자는 숫자, 소문자, 그리고 `-`로만 이루어져야 합니다. 예를 들어 profile API를 구현하는 345번 issue와 연결된 branch는 `345-profile-api`로 이름 짓습니다.
- 불가피하게 하나의 기능 구현에 아주 많은 코드를 작성해야하는 경우, `feat/<issue>-<name>`을 이름으로 branch를 만듭니다. 이 branch 위에 여러 branch를 만들어 해당 기능에 필요한 commit을 각각 PR로 올립니다. `feat` branch를 `main`에 merge할 때에는 이미 code review가 됐다는 전제 하에 전반적인 logic 등만 review합니다. 이후 `main`에 rebase and merge합니다.

## <a name="commit-convention"></a> Commit Convention ✒️

[Angular commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)을 따릅니다. 개발 환경이 올바르게 구성되었다면, git hook에 의해 [commitlint](https://github.com/conventional-changelog/commitlint)가 자동으로 양식을 확인합니다.

### Commit Message Format

각 commit message는 **header**, **body**, 그리고 **footer**로 이루어져 있습니다. Header는 **type**, **scope**, 그리고 **subject**로 이루어져 있습니다.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Header는 commit message의 중심이며, `<scope>` 부분은 선택으로 포함하지 않아도 됩니다.

각 줄은 100 글자를 넘어선 안됩니다. GitHub을 비롯한 각종 tool에서의 가독성을 높이기 위함입니다.

### Revert

이전 commit으로 revert하는 경우, header를 `revert:`로 시작해서 어떤 commit을 revert하는지 적어야 합니다. (예: `revert: this reverts commit <hash>`)

### Message Header

#### Allowed `<type>`

- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서화
- style: formatting, linting 등
- refactor
- test: 누락된 test 추가
- chore: 사소한 것, build 및 패키지 매니저 등 수정

#### `<subject>` test

- `<subject>`에는 변경사항을 요약하여 적습니다.
- 반드시 소문자로 시작하는 영문으로 작성합니다.
- 명령문을 사용합니다. ('change'(O), 'changed'(X), 'changes'(X))
- 마지막에 마침표를 붙이지 않습니다.

### Message Body

한글 또는 영문으로 적으며, 무엇을 왜 구현했는지를 중심으로 가능한 자세히 설명합니다.

### Message Footer

이전과 호환되지 않는 breaking change가 있을 경우 `BREAKING CHANGE:`로 시작하는 설명을 적어야 합니다. 또는 이 commit이 해결하는 issue가 있을 경우 `Closes #000`으로 명시합니다.

### Example

```
fix(fe): redirect authenticated user from login page to home

이미 로그인한 유저는 Log In 페이지에 접근해선 안된다.
Vue Router의 navigation guard를 이용해 redirect한다.

Closes #276
```

```
docs: add dev environment setup guide

Visual Studio Code와 GitPod에서 개발 환경을 세팅하는 방법을 문서화한다.
.devcontainer과 .gitpod.yml 등 설정 파일에 대한 설명을 덧붙인다.
```

## Testing & Debugging 🐞

WIP
