'use-strict';

const $screen = document.querySelector('#screen');
const $order = document.querySelector('#order');
const $result = document.querySelector('#result');
const $averageResult = document.querySelector('#averageResult');

const records = [];
let timeoutId;
let order = 1;
let startTime;
let endTime;
let responseTime;
let averageTime;

$screen.addEventListener('click', function () {
  if ($screen.classList.contains('waiting')) {
    // 대기 화면

    // screen 전환
    $screen.classList.replace('waiting', 'ready');
    $screen.textContent = '초록색이 되면 클릭하세요';

    // 타이머 실행
    timeoutId = setTimeout(
      function () {
        startTime = new Date();
        $screen.classList.replace('ready', 'now');
        $screen.textContent = '클릭하세요';
      },
      Math.floor(Math.random() * 1000 + 2000)
      //2000 <= n < 3000
    );
  } else if ($screen.classList.contains('ready')) {
    // 준비 화면

    // 타이머 종료
    clearTimeout(timeoutId);

    // alert
    alert('빨랐어요! 릴렉스~ 릴렉스~');

    // screen 전환
    $screen.classList.replace('ready', 'waiting');
    $screen.textContent = '클릭해서 시작하세요';
  } else if ($screen.classList.contains('now')) {
    // 클릭 화면

    // 반응 속도 계산
    endTime = new Date();
    responseTime = endTime - startTime;

    // 반응 속도 표시
    $result.textContent = `${responseTime} ms`;

    // 반응 속도 기록 저장
    records.push({ order: order, record: responseTime });

    // 평균 속도 계산
    let sumTime = records.reduce((prev, curr) => {
      return prev + curr['record'];
    }, 0);
    averageTime = sumTime / records.length;

    // 평균 속도 업데이트
    $averageResult.textContent = `${averageTime} ms`;

    // 시도 횟수 업데이트
    order++;
    $order.textContent = order;

    // 초기화
    startTime = null;
    endTime = null;

    // screen 전환
    $screen.classList.replace('now', 'waiting');
    $screen.textContent = '클릭해서 시작하세요';
  }
});
