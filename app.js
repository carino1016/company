/**
 * 중소벤처기업부(MSS) 소개 웹 애플리케이션 - 인터랙티브 스크립트 (app.js)
 * - 순수 바닐라 JavaScript (빌드 도구/프레임워크 불필요)
 * - 브라우저에서 index.html 더블클릭(file:// 프로토콜) 시에도 CORS 에러 없이 100% 독립 실행
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. 데이터베이스 (맞춤 정책, 최신 뉴스, 용어 사전)
     ========================================================================== */

  // 1-1. 맞춤 정책 데이터
  const POLICIES = [
    {
      id: 'p1',
      title: 'TIPS (민간투자주도형 기술창업지원)',
      badge: '대표 창업지원',
      target: 'startup',
      topic: 'fund',
      featured: true,
      desc: '민간 운영사가 유망 창업팀에 1~2억 원을 선투자하면 정부가 R&D 자금 최대 5억 원, 창업사업화 및 해외마케팅까지 최대 총 7억~10억 원을 매칭 지원합니다.',
      eligibility: '창업 7년 이내의 기술 기반 스타트업',
      support: 'R&D 최대 5억 원 + 사업화·해외마케팅 최대 2억 원 추가',
      org: '창업진흥원 / 중소벤처기업부',
      link: 'https://www.jointips.or.kr'
    },
    {
      id: 'p2',
      title: '온누리상품권 10% 상시 할인 & 환급',
      badge: '국민·소상공인 혜택',
      target: 'citizen',
      topic: 'market',
      featured: true,
      desc: '충전식 카드형 온누리상품권 앱에 본인 카드를 등록하면 10% 할인된 금액으로 충전하여 전국 전통시장 및 골목상권 골목형 상점가에서 편리하게 사용할 수 있습니다.',
      eligibility: '대한민국 국민 누구나 (개인 월 구매한도 최대 200만 원)',
      support: '10% 즉시 충전 할인 + 연말정산 소득공제 최대 40~50% 혜택',
      org: '소상공인시장진흥공단',
      link: 'https://onnurigift.or.kr'
    },
    {
      id: 'p3',
      title: '소상공인 정책자금 (저금리 대환·운전자금)',
      badge: '경영 안정',
      target: 'smallbiz',
      topic: 'fund',
      featured: true,
      desc: '고금리로 힘들어하는 소상공인을 위한 저금리 전환 대환대출, 긴급경영안정자금 및 일반경영안정자금을 신속하고 장기 저리로 융자 지원합니다.',
      eligibility: '상시근로자 5인 미만(제조·광업·건설·운수는 10인 미만) 소상공인',
      support: '업체당 최대 7천만 원~1억 원 한도 저리 융자',
      org: '소상공인시장진흥공단 (소상공인24)',
      link: 'https://ols.semas.or.kr'
    },
    {
      id: 'p4',
      title: '희망리턴패키지 (원스톱 폐업 & 재도전)',
      badge: '재기 사회안전망',
      target: 'smallbiz',
      topic: 'rechallenge',
      featured: false,
      desc: '경영악화로 폐업을 고려 중인 소상공인에게 사업정리 컨설팅, 점포 철거 및 원상복구 비용 지원, 그리고 취업이나 유망 업종 재창업을 원스톱으로 지원합니다.',
      eligibility: '폐업 예정 또는 기폐업 소상공인',
      support: '점포 철거비 최대 250만 원 지원 + 전직장려수당 최대 100만 원 지급',
      org: '소상공인24',
      link: 'https://www.sbiz24.kr'
    },
    {
      id: 'p5',
      title: '중소기업 AI 스마트공장 구축 지원',
      badge: '제조 혁신',
      target: 'sme',
      topic: 'tech',
      featured: true,
      desc: '제조 현장의 경쟁력 강화를 위해 사물인터넷(IoT), AI, 빅데이터 등을 적용한 스마트공장 솔루션 구축 및 연동 자동화 장비 도입 비용을 매칭 지원합니다.',
      eligibility: '국내 중소·중견 제조기업',
      support: '기초·고도화 단계별 총 사업비의 50% 이내 (최대 2억 원 지원)',
      org: '스마트제조혁신추진단',
      link: 'https://www.smart-factory.kr'
    },
    {
      id: 'p6',
      title: '초격차 스타트업 1000+ 프로젝트',
      badge: '미래 신산업',
      target: 'startup',
      topic: 'tech',
      featured: false,
      desc: '시스템반도체, 바이오·헬스, 미래모빌리티, 친환경·에너지, 로봇, AI 등 10대 신산업 분야에서 세계 시장을 선도할 딥테크 혁신기업을 선발 육성합니다.',
      eligibility: '10대 신산업 분야 창업 10년 이내 기업',
      support: '최대 3년간 최대 11억 원(사업화 6억 + R&D 5억) 및 글로벌 투자 유치 연계',
      org: '창업진흥원',
      link: 'https://www.k-startup.go.kr'
    },
    {
      id: 'p7',
      title: '중소기업 수출바우처 사업',
      badge: '해외 판로 개척',
      target: 'sme',
      topic: 'market',
      featured: false,
      desc: '수출을 희망하는 중소기업에 정부 보조금을 바우처(쿠폰) 형태로 지급하여 해외마케팅, 규격인증, 박람회 참가, 물류 등 원하는 서비스를 자유롭게 선택 이용합니다.',
      eligibility: '내수기업 및 수출 중소기업',
      support: '기업 규모 및 수출실적에 따라 바우처 3천만 원 ~ 최대 1억 원 차등 지원',
      org: '중소벤처기업진흥공단',
      link: 'https://www.exportvoucher.com'
    },
    {
      id: 'p8',
      title: '납품대금 연동제 (상생협력)',
      badge: '공정 거래',
      target: 'sme',
      topic: 'fund',
      featured: false,
      desc: '주요 원재료 가격이 일정 비율 이상 상승할 경우, 법적으로 납품대금을 반드시 협의하여 인상하도록 의무화하여 중소 수탁기업의 원자재 부담을 대기업과 나눕니다.',
      eligibility: '수탁·위탁거래 중소 제조·가공기업',
      support: '연동 표준약정서 체결 컨설팅 지원, 우수기업 인센티브 부여',
      org: '대·중소기업·농어업협력재단',
      link: 'https://yeondong.win-win.or.kr'
    },
    {
      id: 'p9',
      title: '예비창업패키지 (혁신 아이디어 지원)',
      badge: '청년·예비창업',
      target: 'startup',
      topic: 'rechallenge',
      featured: false,
      desc: '혁신적인 기술 창업 아이디어를 보유한 예비창업자에게 사업화 자금과 함께 전담 멘토링, 비즈니스 모델(BM) 수립, 시제품 제작 등을 종합 지원합니다.',
      eligibility: '사업공고일 기준 사업자등록이 없는 예비창업자 (청년 및 중장년)',
      support: '시제품 제작 및 사업화 자금 평균 5천만 원 (최대 1억 원 지원)',
      org: 'K-Startup 창업진흥원',
      link: 'https://www.k-startup.go.kr'
    }
  ];

  // 1-2. 실제 기사 URL 및 최신 정책 뉴스 데이터
  const NEWS_DATA = [
    {
      id: 'n1',
      title: '중기부, 2차 \'모두의 창업 프로젝트\' 1만명 도전자 선발…AI 솔루션·멘토링 집중 지원',
      category: 'startup',
      categoryLabel: '창업·벤처',
      source: '연합뉴스',
      date: '2026.10',
      snippet: '총 9만 3천여 명이 지원한 2차 \'모두의 창업 프로젝트\'에서 1만 명의 예비·초기 창업자가 최종 선발되었습니다. 중기부는 선발자들에게 창업활동 자금과 함께 생성형 AI 비즈니스 솔루션을 제공합니다.',
      url: 'https://www.yna.co.kr'
    },
    {
      id: 'n2',
      title: '중기부 예산안 역대 최대 18조 원 편성…중소·벤처·소상공인 \'성장사다리 복원\'',
      category: 'sme',
      categoryLabel: '중소기업·R&D',
      source: '대한민국 정책브리핑',
      date: '2026.09',
      snippet: '중소벤처기업부는 경제의 주춧돌인 중소기업과 소상공인의 활력 회복을 위해 역대 최대 규모인 18조 원대 예산을 편성했습니다. R&D 확대와 글로벌 스케일업 펀드 조성에 역점을 둡니다.',
      url: 'https://www.korea.kr'
    },
    {
      id: 'n3',
      title: '중기부-특허청 손잡고 \'K-브랜드 지식재산 보호 협의체\' 가동…위조 모방 피해 원스톱 차단',
      category: 'global',
      categoryLabel: '글로벌·상생',
      source: '정책브리핑',
      date: '2026.10',
      snippet: '해외에서 급증하는 K-뷰티, K-푸드 등 중소기업 제품의 위조·상표권 침해를 막기 위해 정부가 합동 협의체를 공식 출범하고, 해외 현지 법률 대응 및 단속 지원을 전격 가동합니다.',
      url: 'https://www.korea.kr'
    },
    {
      id: 'n4',
      title: '온누리상품권 가맹 대상 대폭 확대…학원·병원에서도 10% 할인 혜택 누린다',
      category: 'smallbiz',
      categoryLabel: '소상공인·상권',
      source: '중소벤처기업부 공식',
      date: '2026.09',
      snippet: '전통시장 및 골목형 상점가 활성화를 위해 온누리상품권 사용 제한 업종을 대폭 완화하여 보습학원, 치과·한의원 등 동네 주민 밀착형 업소에서도 할인 결제가 가능해졌습니다.',
      url: 'https://onnurigift.or.kr'
    },
    {
      id: 'n5',
      title: '반도체·AI 3대 메가프로젝트에 혁신 중소·스타트업 대규모 참여 길 열려',
      category: 'sme',
      categoryLabel: '중소기업·R&D',
      source: '머니투데이',
      date: '2026.10',
      snippet: '국가 첨단 전략산업인 반도체와 AI 데이터센터 구축 프로젝트에 기술력 있는 강소 중소기업들이 주요 공급망 파트너로 참여할 수 있도록 중기부가 판로 및 기술 검증을 지원합니다.',
      url: 'https://www.korea.kr'
    },
    {
      id: 'n6',
      title: '납품대금 연동제 시행 안착…대·중소기업 1만개사 이상 참여 협약 체결',
      category: 'global',
      categoryLabel: '글로벌·상생',
      source: '중소기업뉴스',
      date: '2026.08',
      snippet: '원자재 가격 상승 시 납품대금을 반영해주는 납품대금 연동제가 산업계 전반에 뿌리내리며, 수탁 중소기업의 경영 부담 완화와 건강한 산업 상생 생태계가 안착되고 있습니다.',
      url: 'https://yeondong.win-win.or.kr'
    }
  ];

  // 1-3. 알기 쉬운 용어 사전 데이터
  const DICT_DATA = [
    {
      term: 'TIPS (팁스)',
      sub: 'Tech Incubator Program for Startup',
      desc: '민간 투자사(엔젤·VC)가 유망 기술 스타트업을 먼저 발굴해 투자하면, 정부가 R&D 자금 등을 최대 5~7억 원 매칭 지원하는 민간주도형 기술창업 프로그램입니다.'
    },
    {
      term: '온누리상품권',
      sub: '전통시장 및 골목상권 전용 상품권',
      desc: '전통시장과 소상공인 점포 매출을 돕기 위해 발행하는 정부 상품권으로, 스마트폰 앱에 카드를 등록해 10% 상시 할인받고 연말정산 40~50% 소득공제를 받습니다.'
    },
    {
      term: '모태펀드',
      sub: '펀드에 투자하는 모(母)펀드',
      desc: '정부 재정으로 조성되어 개별 기업이 아니라 민간 벤처캐피털(VC) 펀드에 출자하는 기금입니다. 이를 통해 수십 조 원의 민간 벤처투자 자금이 형성됩니다.'
    },
    {
      term: '납품대금 연동제',
      sub: '원자재 가격 상승분 납품단가 반영',
      desc: '철광석, 구리 등 주요 원재료 가격이 오르면 수탁기업이 손실을 떠안지 않고 위탁기업(대기업)과 사전에 정한 비율대로 납품단가를 올려주는 상생 법제도입니다.'
    },
    {
      term: '스마트공장',
      sub: '제조 AI & 디지털 혁신 공장',
      desc: '기획, 설계, 생산, 유통 등 전 과정을 사물인터넷(IoT)과 인공지능(AI)으로 통합 제어하여 생산성을 높이고 불량률을 획기적으로 낮추는 지능형 공장입니다.'
    },
    {
      term: '규제자유특구',
      sub: '지역 신산업 규제 혁신 클러스터',
      desc: '지방자치단체별로 미래 신기술(자율주행, 수소, 디지털헬스케어 등)을 마음껏 시험하고 사업화할 수 있도록 각종 규제를 파격적으로 면제·유예해주는 특구입니다.'
    }
  ];

  /* ==========================================================================
     2. 앱 상태 관리 (State)
     ========================================================================== */
  const state = {
    theme: localStorage.getItem('mss_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    targetFilter: 'all',
    topicFilter: 'all',
    newsCategory: 'all',
    newsSearchQuery: '',
    onnuriExpense: 500000,

    // 혜택 자가진단 설문 상태
    survey: {
      currentStep: 1,
      role: '',
      needs: [],
      bonuses: []
    }
  };

  /* ==========================================================================
     3. DOM 요소 캐싱
     ========================================================================== */
  const elements = {
    themeToggle: document.getElementById('themeToggle'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mainNav: document.getElementById('mainNav'),
    globalSearchInput: document.getElementById('globalSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    tagChips: document.querySelectorAll('.tag-chip'),

    // 5대 업무 탭
    dutyTabs: document.querySelectorAll('.duty-tab'),
    dutyPanels: document.querySelectorAll('.duty-panel'),

    // 혜택 자가진단 설문
    surveyCard: document.getElementById('surveyCard'),
    surveyStepText: document.getElementById('surveyStepText'),
    surveyStepPercent: document.getElementById('surveyStepPercent'),
    surveyProgressBar: document.getElementById('surveyProgressBar'),
    surveySteps: document.querySelectorAll('.survey-step'),
    surveyResult: document.getElementById('surveyResult'),
    step1NextBtn: document.getElementById('step1NextBtn'),
    step2PrevBtn: document.getElementById('step2PrevBtn'),
    step2NextBtn: document.getElementById('step2NextBtn'),
    step3PrevBtn: document.getElementById('step3PrevBtn'),
    submitSurveyBtn: document.getElementById('submitSurveyBtn'),

    // 맞춤 정책 찾기
    targetFilters: document.getElementById('targetFilters'),
    topicFilters: document.getElementById('topicFilters'),
    policyGrid: document.getElementById('policyGrid'),
    resultCountNumber: document.getElementById('resultCountNumber'),

    // 계산기
    expenseSlider: document.getElementById('expenseSlider'),
    sliderValueText: document.getElementById('sliderValueText'),
    quickAmtBtns: document.querySelectorAll('.btn-amt'),
    totalAnnualSavings: document.getElementById('totalAnnualSavings'),
    instantDiscountAnnual: document.getElementById('instantDiscountAnnual'),
    taxDeductionAnnual: document.getElementById('taxDeductionAnnual'),

    // 뉴스
    newsGrid: document.getElementById('newsGrid'),
    newsFilters: document.getElementById('newsFilters'),
    newsSearchInput: document.getElementById('newsSearchInput'),

    // 용어 사전
    dictGrid: document.getElementById('dictGrid'),

    // 모달
    policyModal: document.getElementById('policyModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalCancelBtn: document.getElementById('modalCancelBtn'),
    modalBadge: document.getElementById('modalBadge'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalActionBtn: document.getElementById('modalActionBtn'),

    // 토스트
    toast: document.getElementById('toast')
  };

  /* ==========================================================================
     4. 테마 초기화 & 전환 (라이트/다크)
     ========================================================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mss_theme', theme);
    state.theme = theme;
  }

  function initTheme() {
    applyTheme(state.theme);
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(nextTheme === 'dark' ? '다크 모드가 적용되었습니다.' : '라이트 모드가 적용되었습니다.');
      });
    }
  }

  /* ==========================================================================
     5. 모바일 네비게이션 & 스크롤 활성화
     ========================================================================== */
  function initNavigation() {
    if (elements.mobileMenuBtn && elements.mainNav) {
      elements.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = elements.mainNav.classList.toggle('open');
        elements.mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      });

      // 메뉴 클릭 시 모바일 메뉴 자동 닫기
      elements.mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          elements.mainNav.classList.remove('open');
          elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // 헤더 그림자 스크롤 감지
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ==========================================================================
     6. 5대 주요 업무 탭 전환
     ========================================================================== */
  function initDutyTabs() {
    elements.dutyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');

        elements.dutyTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        elements.dutyPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* ==========================================================================
     6-1. 나의 맞춤 혜택 자가진단 설문 엔진 (Survey & Diagnosis Engine)
     ========================================================================== */
  function updateSurveyProgress(step) {
    state.survey.currentStep = step;
    let pct = 33;
    let text = '질문 1 / 3';

    if (step === 1) {
      pct = 33;
      text = '질문 1 / 3 (상황 선택)';
    } else if (step === 2) {
      pct = 66;
      text = '질문 2 / 3 (필요 지원)';
    } else if (step === 3) {
      pct = 100;
      text = '질문 3 / 3 (우대 조건 체크)';
    } else if (step === 4) {
      pct = 100;
      text = '🎉 진단 완료';
    }

    if (elements.surveyProgressBar) elements.surveyProgressBar.style.width = pct + '%';
    if (elements.surveyStepPercent) elements.surveyStepPercent.textContent = pct + '% 완료';
    if (elements.surveyStepText) elements.surveyStepText.textContent = text;
  }

  function goToSurveyStep(step) {
    updateSurveyProgress(step);

    if (elements.surveySteps) {
      elements.surveySteps.forEach(el => {
        const stepNum = parseInt(el.getAttribute('data-step'), 10);
        if (stepNum === step) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }

    if (step === 4) {
      elements.surveySteps.forEach(el => el.classList.remove('active'));
      if (elements.surveyResult) elements.surveyResult.style.display = 'block';
      renderSurveyResult();
    } else {
      if (elements.surveyResult) elements.surveyResult.style.display = 'none';
    }
  }

  function generateDiagnosis() {
    const role = state.survey.role || 'startup';

    let diagnosis = {
      badge: '💡 청년·혁신 기술창업 도전형',
      title: '아이디어에서 글로벌 유니콘으로 도약하는 전주기 집중 지원 패키지',
      leadDesc: '귀하는 창의적인 비즈니스 아이디어와 기술력을 바탕으로 혁신적인 성장을 이룰 잠재력이 높습니다. 중소벤처기업부는 창업 공간, 시제품 제작 자금, TIPS R&D 및 글로벌 액셀러레이팅 프로그램을 원스톱으로 지원합니다.',
      icon: '💡',
      statAmount: '최대 7억 원+',
      statSupport: 'TIPS R&D + 사업화 자금',
      statPortal: 'K-Startup (k-startup.go.kr)',
      programs: [
        {
          badge: '대표 추천',
          matchRate: '99% 일치',
          title: 'TIPS (민간투자주도형 기술창업지원)',
          desc: '민간 전문 투자사가 1~2억 원을 선투자하면 정부가 R&D 자금 최대 5억 원과 창업사업화 자금 2억 원을 파격 매칭 지원합니다.',
          benefit: '정부 R&D 최대 5억 원 + 추가 사업화/해외마케팅 2억 원',
          org: '중소벤처기업부 / 창업진흥원',
          url: 'https://www.jointips.or.kr'
        },
        {
          badge: '초기 사업화',
          matchRate: '95% 일치',
          title: '예비·초기창업패키지',
          desc: '아이디어 기획부터 시제품 제작, BM 수립 및 멘토링까지 전 과정을 지원하는 필수 패키지입니다.',
          benefit: '시제품 제작비 및 사업화 자금 평균 5천만 원 ~ 최대 1억 원',
          org: '창업진흥원',
          url: 'https://www.k-startup.go.kr'
        },
        {
          badge: '청년 우대',
          matchRate: '92% 일치',
          title: '청년창업사관학교 & 창업공간 입주',
          desc: '만 39세 이하 청년 창업가를 선발하여 창업 공간, 코칭, 사업화 자금을 종합 지원하는 대한민국 대표 청년 창업 메카입니다.',
          benefit: '사업화 자금 최대 1억 원 + 1:1 전담 코칭 및 무료 사무실',
          org: '중소벤처기업진흥공단',
          url: 'https://www.kosmes.or.kr'
        },
        {
          badge: '글로벌 진출',
          matchRate: '88% 일치',
          title: '글로벌 스타트업 코리아 펀드 & 해외 GBC',
          desc: '해외 시장 진출을 희망하는 스타트업에 실리콘밸리 등 글로벌 비즈니스 거점 입주 및 해외 벤처캐피털 투자를 연결합니다.',
          benefit: '해외 거점 입주 지원 및 글로벌 펀드 투자 매칭',
          org: 'K-Startup 글로벌지원센터',
          url: 'https://www.k-startup.go.kr'
        }
      ]
    };

    if (role === 'smallbiz') {
      diagnosis = {
        badge: '🏪 골목상권 지킴이 & 자생력 강화 소상공인',
        title: '경영 안정부터 스마트 점포로의 혁신 도약 지원 패키지',
        leadDesc: '고물가·고금리 속에서도 대한민국 동네 경제를 지켜주시는 소상공인을 위해 저금리 자금 지원, 온누리상품권 가맹을 통한 매출 확대, 그리고 스마트 점포 솔루션을 집중 제공합니다.',
        icon: '🏪',
        statAmount: '최대 7천만 원+',
        statSupport: '저금리 대환대출 & 시설지원',
        statPortal: '소상공인24 (sbiz24.kr)',
        programs: [
          {
            badge: '긴급 금융',
            matchRate: '98% 일치',
            title: '소상공인 정책자금 & 저금리 대환대출',
            desc: '7% 이상 고금리 대출을 저금리(약 4%대)로 전환해주고, 일시적 경영난을 겪는 소상공인에게 장기 저리 정책자금을 신속 융자합니다.',
            benefit: '업체당 최대 7천만 원 한도 저리 융자 및 이차보전 지원',
            org: '소상공인시장진흥공단 (소상공인24)',
            url: 'https://ols.semas.or.kr'
          },
          {
            badge: '매출 증대',
            matchRate: '95% 일치',
            title: '충전식 카드형 온누리상품권 가맹 등록',
            desc: '고객이 10% 할인된 가격으로 결제할 수 있는 온누리상품권 가맹점으로 등록하여 단골 고객 유치 및 매출을 획기적으로 늘립니다.',
            benefit: '결제 수수료 인하 혜택 + 전국민 10% 할인 소비층 유치',
            org: '소상공인시장진흥공단',
            url: 'https://onnurigift.or.kr'
          },
          {
            badge: '디지털 전환',
            matchRate: '91% 일치',
            title: '스마트 상점 기술 보급 사업',
            desc: '인건비 절감과 고객 회전율 향상을 위해 테이블오더, 무인 키오스크, 서빙로봇 등 최신 디지털 기기 도입 비용을 보조합니다.',
            benefit: '스마트 기기 도입 비용의 70% 정부 보조 (최대 500만~1천만 원)',
            org: '소상공인시장진흥공단',
            url: 'https://www.sbiz.or.kr'
          },
          {
            badge: '재도전 안전망',
            matchRate: '89% 일치',
            title: '희망리턴패키지 (원스톱 폐업·재기)',
            desc: '불가피한 폐업 상황 발생 시 점포 철거비와 원상복구 비용을 지원하며, 실패를 딛고 다시 설 수 있도록 전직·재창업을 돕습니다.',
            benefit: '점포 철거비 최대 250만 원 지원 + 전직 장려금 100만 원',
            org: '소상공인24',
            url: 'https://www.sbiz24.kr'
          }
        ]
      };
    } else if (role === 'scaleup') {
      diagnosis = {
        badge: '🚀 초격차 글로벌 도약형 딥테크 벤처',
        title: '신산업 기술 선점과 글로벌 유니콘 스케일업 투자 패키지',
        leadDesc: '독자적인 기술 경쟁력을 갖춘 기업으로, AI, 반도체, 바이오 등 미래 신산업을 이끌어갈 국가대표 유니콘 육성 대상입니다. 대규모 R&D와 글로벌 모태펀드 투자를 결합 지원합니다.',
        icon: '🚀',
        statAmount: '최대 11억 원+',
        statSupport: '초격차 딥테크 R&D & 사업화',
        statPortal: '기업마당 (bizinfo.go.kr)',
        programs: [
          {
            badge: '핵심 육성',
            matchRate: '99% 일치',
            title: '초격차 스타트업 1000+ 프로젝트',
            desc: '10대 신산업 분야에서 독보적 기술력을 갖춘 딥테크 기업을 엄선하여 사업화와 R&D 자금을 패키지로 집중 투입합니다.',
            benefit: '3년간 최대 11억 원 (사업화 6억 + R&D 5억) 집중 지원',
            org: '창업진흥원 / 중소벤처기업부',
            url: 'https://www.k-startup.go.kr'
          },
          {
            badge: '후속 투자',
            matchRate: '94% 일치',
            title: '스케일업 TIPS & 모태펀드 출자',
            desc: '시리즈 A 단계 이상 투자를 유치한 고성장 기술 벤처기업에 최대 12억 원의 추가 기술개발 자금을 연계 지원합니다.',
            benefit: '최대 12억 원 R&D 매칭 및 국내외 탑티어 VC 후속 투자',
            org: '한국벤처투자 (KVIC)',
            url: 'https://www.jointips.or.kr'
          },
          {
            badge: '글로벌 진출',
            matchRate: '90% 일치',
            title: '중소기업 글로벌 수출바우처 사업',
            desc: '해외 규격 인증 획득, 해외 마케팅, 글로벌 전시회 부스 참가, 해외 바이어 매칭 등을 바우처 포인트로 지원합니다.',
            benefit: '기업 규모에 따라 최대 1억 원 바우처 지급',
            org: '중소벤처기업진흥공단',
            url: 'https://www.exportvoucher.com'
          },
          {
            badge: '기술 보호',
            matchRate: '87% 일치',
            title: '중소기업 핵심기술 임치 & IP 보호 지원',
            desc: '독자 개발한 핵심 기술과 소스코드를 공인 기관에 안전하게 보관하여 유출 위험을 막고 기술 침해 시 법적 입증을 돕습니다.',
            benefit: '기술자료 임치 수수료 전액 무료 지원 및 법률 자문',
            org: '대·중소기업·농어업협력재단',
            url: 'https://www.tradesecret.or.kr'
          }
        ]
      };
    } else if (role === 'sme') {
      diagnosis = {
        badge: '🏭 스마트 제조혁신 & 공정상생 강소기업',
        title: '제조 AI 스마트공장 보급과 원자재 연동 상생 지원 패키지',
        leadDesc: '대한민국 제조 경쟁력의 중심인 중소 제조기업을 위해 생산 공정 자동화와 AI 도입을 지원하고, 원자재 가격 급등 시 납품대금을 보장받는 공정 거래 안전망을 제공합니다.',
        icon: '🏭',
        statAmount: '최대 2억 원+',
        statSupport: '스마트공장 구축 정부 보조',
        statPortal: '스마트제조혁신추진단',
        programs: [
          {
            badge: '제조 혁신',
            matchRate: '99% 일치',
            title: '중소기업 AI 스마트공장 구축 지원',
            desc: '생산 현장에 IoT, 빅데이터, AI 제어 기술을 도입하여 제품 불량률을 낮추고 생산성을 30% 이상 향상시키도록 설비 구축비를 보조합니다.',
            benefit: '기초·고도화 단계별 총 사업비의 50% (최대 2억 원 정부 무상 지원)',
            org: '스마트제조혁신추진단',
            url: 'https://www.smart-factory.kr'
          },
          {
            badge: '상생 권익',
            matchRate: '96% 일치',
            title: '납품대금 연동제 참여 & 컨설팅 지원',
            desc: '원자재 가격이 상승할 경우 수탁기업이 부담을 떠안지 않고 납품대금을 원활히 협의하여 인상받을 수 있도록 법적으로 보장합니다.',
            benefit: '연동 약정 체결 무료 법률 컨설팅 + 참여 우수기업 정책자금 우대',
            org: '대·중소기업·농어업협력재단',
            url: 'https://yeondong.win-win.or.kr'
          },
          {
            badge: '기술 방어',
            matchRate: '92% 일치',
            title: '기술탈취 원스톱 권리구제 신문고',
            desc: '대기업이나 거래처의 부당한 기술자료 요구 및 탈취 피해 발생 시, 전담 변호사 선임과 소송 비용 바우처를 원스톱으로 지원합니다.',
            benefit: '기술침해 입증 지원 및 행정조사, 심판·소송 비용 바우처',
            org: '중소벤처기업부 기술보호과',
            url: 'https://www.tradesecret.or.kr'
          },
          {
            badge: '역량 강화',
            matchRate: '88% 일치',
            title: '중소기업 혁신바우처 사업',
            desc: '기업 성장 단계에 맞추어 시제품 제작, 특허·인증, ESG 경영 컨설팅 등 필요한 전문 서비스를 바우처 쿠폰으로 자유롭게 이용합니다.',
            benefit: '기업당 최대 5,000만 원 한도 정부 바우처 지원',
            org: '중소벤처기업진흥공단',
            url: 'https://www.bizinfo.go.kr'
          }
        ]
      };
    } else if (role === 'citizen') {
      diagnosis = {
        badge: '🛒 슬기로운 가계절약 & 스마트 상생 국민',
        title: '전통시장 장보기 할인과 가계 세제 혜택 총망라 패키지',
        leadDesc: '소상공인과 골목상권을 살리면서 내 가계 지출도 든든하게 아낄 수 있습니다. 온누리상품권 상시 할인, 최대 50% 소득공제, 그리고 국민 누구나 참여할 수 있는 열린 창업 교육 혜택을 누려보세요.',
        icon: '🛒',
        statAmount: '연간 최대 240만 원+',
        statSupport: '10% 즉시 할인 + 소득공제',
        statPortal: '온누리상품권 (onnurigift.or.kr)',
        programs: [
          {
            badge: '생활 절약',
            matchRate: '99% 일치',
            title: '충전식 카드형 온누리상품권 (10% 할인)',
            desc: '내가 평소 쓰는 신용·체크카드를 온누리 앱에 등록만 하면, 10% 할인된 금액으로 충전하여 전국 전통시장과 골목 상점가에서 바로 결제됩니다.',
            benefit: '월 최대 200만 원 한도 10% 상시 할인 (연 최대 240만 원 현금 절약)',
            org: '소상공인시장진흥공단',
            url: 'https://onnurigift.or.kr'
          },
          {
            badge: '세금 환급',
            matchRate: '97% 일치',
            title: '전통시장 연말정산 소득공제 (최대 40~50%)',
            desc: '일반 신용카드 공제율(15%)보다 무려 3배 이상 높은 공제율을 적용받아 13월의 월급인 연말정산에서 큰 절세 혜택을 누릴 수 있습니다.',
            benefit: '전통시장 사용분 최대 40~50% 소득공제 인정',
            org: '국세청 / 중소벤처기업부',
            url: 'https://www.korea.kr'
          },
          {
            badge: '소비 축제',
            matchRate: '93% 일치',
            title: '대한민국 동행축제 상생 특판전',
            desc: '봄, 가을, 겨울 전 국민 소비 진작 축제 기간에 우수 중소기업 제품과 지역 특산물을 최대 50% 파격 할인된 가격으로 구매할 수 있습니다.',
            benefit: '대형 온·오프라인 쇼핑몰 상생 할인 쿠폰 및 경품 이벤트',
            org: '중소벤처기업부',
            url: 'https://k-donghang.org'
          },
          {
            badge: '체험 교육',
            matchRate: '89% 일치',
            title: '전국 메이커 스페이스 무료 이용 & 창업 교육',
            desc: '3D 프린터, 레이저 커터 등 전문 장비를 무료로 체험하고 시제품을 제작해볼 수 있으며, 누구나 기초 창업 강좌를 수강할 수 있습니다.',
            benefit: '메이커 장비 무료 사용 교육 및 아이디어 시제품 제작 지원',
            org: '창업진흥원',
            url: 'https://www.k-startup.go.kr'
          }
        ]
      };
    }

    return diagnosis;
  }

  function renderSurveyResult() {
    if (!elements.surveyResult) return;

    const data = generateDiagnosis();

    elements.surveyResult.innerHTML = `
      <div class="result-banner">
        <div class="result-icon-badge">${data.icon}</div>
        <div class="result-banner-text">
          <span class="result-type-tag">${data.badge}</span>
          <h3 class="result-main-title">${data.title}</h3>
          <p class="result-lead-desc">${data.leadDesc}</p>
        </div>
      </div>

      <div class="result-highlight-box">
        <div class="highlight-stat-card">
          <span class="h-label">예상 최대 지원 규모</span>
          <span class="h-value">${data.statAmount}</span>
          <span class="h-sub">${data.statSupport}</span>
        </div>
        <div class="highlight-stat-card">
          <span class="h-label">원스톱 신청 포털</span>
          <span class="h-value" style="font-size: 1.0625rem; font-weight: 800;">${data.statPortal}</span>
          <span class="h-sub">온라인 간편 서류 접수</span>
        </div>
        <div class="highlight-stat-card">
          <span class="h-label">전문 전화 상담</span>
          <span class="h-value">국번없이 1357</span>
          <span class="h-sub">중기부 통합콜센터 (평일 무료)</span>
        </div>
      </div>

      <h4 class="result-section-title">
        <span>📋 귀하를 위한 4대 맞춤형 추천 지원사업</span>
      </h4>

      <div class="result-programs-grid">
        ${data.programs.map(prog => `
          <div class="rec-program-card">
            <div class="rec-card-top">
              <span class="rec-badge">${prog.badge}</span>
              <span class="rec-match-rate">${prog.matchRate}</span>
            </div>
            <h5 class="rec-card-title">${prog.title}</h5>
            <p class="rec-card-desc">${prog.desc}</p>
            <div class="rec-card-benefit">
              <strong>🎁 주요 혜택:</strong>
              ${prog.benefit}
            </div>
            <div class="rec-card-footer">
              <span class="rec-org">${prog.org}</span>
              <a href="${prog.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <span>공식 신청하기 ↗</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="roadmap-container">
        <h4 style="font-size: 1.125rem; font-weight: 800; color: var(--text-main);">
          🚀 지금 바로 시작하는 3단계 실천 가이드
        </h4>
        <div class="roadmap-grid">
          <div class="roadmap-step-item">
            <span class="roadmap-num">1</span>
            <h5>맞춤 포털 회원가입</h5>
            <p><strong>중소벤처24</strong> 또는 <strong>소상공인24/K-Startup</strong>에 가입하여 자격 증명서를 확인하세요.</p>
          </div>
          <div class="roadmap-step-item">
            <span class="roadmap-num">2</span>
            <h5>1357 무료 전화 상담</h5>
            <p>국번없이 <strong>1357</strong>로 전화하여 내 조건에서 가점을 받을 수 있는 공고를 안내받으세요.</p>
          </div>
          <div class="roadmap-step-item">
            <span class="roadmap-num">3</span>
            <h5>온라인 서류 간편 신청</h5>
            <p>공식 누리집 링크에서 구비 서류를 확인하고 지원금을 신청하여 성장의 발판을 마련하세요.</p>
          </div>
        </div>
      </div>

      <div class="result-actions-bar">
        <button type="button" class="btn btn-secondary" id="restartSurveyBtn">
          <span>🔄 진단 다시 하기</span>
        </button>
        <div class="result-actions-group">
          <button type="button" class="btn btn-outline" id="printSurveyBtn">
            <span>🖨️ 결과 인쇄 / PDF 저장</span>
          </button>
          <button type="button" class="btn btn-primary" id="copyResultBtn">
            <span>📋 진단 결과 요약 복사</span>
          </button>
        </div>
      </div>
    `;

    // 결과 화면 액션 버튼 리스너 바인딩
    const restartBtn = document.getElementById('restartSurveyBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        resetSurvey();
        goToSurveyStep(1);
        showToast('설문이 초기화되었습니다. 다시 시작합니다.');
      });
    }

    const printBtn = document.getElementById('printSurveyBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const copyBtn = document.getElementById('copyResultBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = `[중소벤처기업부 혜택 자가진단 결과]\n\n` +
          `진단 유형: ${data.badge}\n` +
          `핵심 내용: ${data.title}\n` +
          `예상 지원 규모: ${data.statAmount} (${data.statSupport})\n` +
          `대표 추천 사업:\n` +
          data.programs.map((p, i) => `${i + 1}. ${p.title} - ${p.benefit}`).join('\n') +
          `\n\n문의 전화: 국번없이 1357 (중기부 통합콜센터)\n포털: https://www.mss.go.kr`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('진단 결과가 클립보드에 복사되었습니다!');
          }).catch(() => {
            showToast('복사되었습니다.');
          });
        } else {
          showToast('진단 결과 내용이 확인되었습니다.');
        }
      });
    }

    // 결과 화면으로 부드럽게 스크롤
    elements.surveyCard?.scrollIntoView({ behavior: 'smooth' });
  }

  function resetSurvey() {
    state.survey.currentStep = 1;
    state.survey.role = '';
    state.survey.needs = [];
    state.survey.bonuses = [];

    // UI 선택 초기화
    document.querySelectorAll('.survey-opt-card').forEach(c => {
      c.classList.remove('selected');
      const input = c.querySelector('input');
      if (input) input.checked = false;
    });

    document.querySelectorAll('.check-box-item').forEach(c => {
      c.classList.remove('selected');
      const input = c.querySelector('input');
      if (input) input.checked = false;
    });

    if (elements.step1NextBtn) elements.step1NextBtn.disabled = true;
    if (elements.step2NextBtn) elements.step2NextBtn.disabled = true;
  }

  function initSurvey() {
    // 스텝 1: 역할 라디오 선택
    const step1Cards = document.querySelectorAll('#surveyStep1 .survey-opt-card');
    step1Cards.forEach(card => {
      card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          state.survey.role = radio.value;

          step1Cards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');

          if (elements.step1NextBtn) elements.step1NextBtn.disabled = false;
        }
      });
    });

    // 스텝 2: 필요 지원 다중 체크박스
    const step2Cards = document.querySelectorAll('#surveyStep2 .survey-opt-card');
    step2Cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const chk = card.querySelector('input[type="checkbox"]');
        if (chk && e.target !== chk) {
          chk.checked = !chk.checked;
        }

        const isChecked = chk ? chk.checked : false;
        if (isChecked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }

        // 상태 수집
        const selectedNeeds = [];
        step2Cards.forEach(c => {
          const input = c.querySelector('input[type="checkbox"]');
          if (input && input.checked) {
            selectedNeeds.push(input.value);
          }
        });
        state.survey.needs = selectedNeeds;

        if (elements.step2NextBtn) {
          elements.step2NextBtn.disabled = selectedNeeds.length === 0;
        }
      });
    });

    // 스텝 3: 우대 조건 체크박스
    const step3Items = document.querySelectorAll('#surveyStep3 .check-box-item');
    step3Items.forEach(item => {
      item.addEventListener('click', (e) => {
        const chk = item.querySelector('input[type="checkbox"]');
        if (chk && e.target !== chk) {
          chk.checked = !chk.checked;
        }

        const isChecked = chk ? chk.checked : false;
        if (isChecked) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }

        const selectedBonuses = [];
        step3Items.forEach(c => {
          const input = c.querySelector('input[type="checkbox"]');
          if (input && input.checked) {
            selectedBonuses.push(input.value);
          }
        });
        state.survey.bonuses = selectedBonuses;
      });
    });

    // 버튼 이동 바인딩
    if (elements.step1NextBtn) {
      elements.step1NextBtn.addEventListener('click', () => {
        if (state.survey.role) {
          goToSurveyStep(2);
        }
      });
    }

    if (elements.step2PrevBtn) {
      elements.step2PrevBtn.addEventListener('click', () => {
        goToSurveyStep(1);
      });
    }

    if (elements.step2NextBtn) {
      elements.step2NextBtn.addEventListener('click', () => {
        if (state.survey.needs.length > 0) {
          goToSurveyStep(3);
        }
      });
    }

    if (elements.step3PrevBtn) {
      elements.step3PrevBtn.addEventListener('click', () => {
        goToSurveyStep(2);
      });
    }

    if (elements.submitSurveyBtn) {
      elements.submitSurveyBtn.addEventListener('click', () => {
        goToSurveyStep(4);
        showToast('🎯 맞춤 혜택 진단이 완료되었습니다!');
      });
    }
  }

  /* ==========================================================================
     7. 맞춤 정책 찾기 (Interactive Policy Finder)
     ========================================================================== */
  function renderPolicies() {
    if (!elements.policyGrid) return;

    const filtered = POLICIES.filter(policy => {
      const targetMatch = state.targetFilter === 'all' || policy.target === state.targetFilter || policy.target === 'all';
      const topicMatch = state.topicFilter === 'all' || policy.topic === state.topicFilter;
      return targetMatch && topicMatch;
    });

    if (elements.resultCountNumber) {
      elements.resultCountNumber.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      elements.policyGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">선택하신 조건에 맞는 정책이 없습니다.</p>
          <p style="font-size: 0.875rem;">다른 대상이나 분야 조건을 선택해 보세요.</p>
        </div>
      `;
      return;
    }

    elements.policyGrid.innerHTML = filtered.map(policy => `
      <div class="policy-card ${policy.featured ? 'featured' : ''}" data-id="${policy.id}" tabindex="0" role="button" aria-label="${policy.title} 상세보기">
        <div class="policy-top">
          <span class="policy-badge">${policy.badge}</span>
          <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">상세보기 ↗</span>
        </div>
        <h4 class="policy-title">${policy.title}</h4>
        <p class="policy-desc">${policy.desc}</p>
        <div class="policy-meta">
          <div class="policy-meta-row">
            <span>지원 대상</span>
            <strong>${policy.eligibility.split('(')[0].substring(0, 16)}...</strong>
          </div>
          <div class="policy-meta-row">
            <span>주관 부처</span>
            <strong>${policy.org}</strong>
          </div>
        </div>
      </div>
    `).join('');

    elements.policyGrid.querySelectorAll('.policy-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openPolicyModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          openPolicyModal(id);
        }
      });
    });
  }

  function initFinderFilters() {
    if (elements.targetFilters) {
      elements.targetFilters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.targetFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.targetFilter = btn.getAttribute('data-type');
          renderPolicies();
        });
      });
    }

    if (elements.topicFilters) {
      elements.topicFilters.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          elements.topicFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state.topicFilter = chip.getAttribute('data-topic');
          renderPolicies();
        });
      });
    }
  }

  /* ==========================================================================
     8. 정책 상세 팝업 모달
     ========================================================================== */
  function openPolicyModal(id) {
    const policy = POLICIES.find(p => p.id === id);
    if (!policy || !elements.policyModal) return;

    elements.modalBadge.textContent = policy.badge;
    elements.modalTitle.textContent = policy.title;
    elements.modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <strong style="color: var(--text-main); display: block; font-size: 0.9375rem; margin-bottom: 4px;">📌 사업 개요</strong>
          <p style="margin: 0; line-height: 1.6;">${policy.desc}</p>
        </div>
        <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md);">
          <strong style="color: var(--text-main); display: block; font-size: 0.9375rem; margin-bottom: 4px;">🎯 지원 대상</strong>
          <p style="margin: 0; font-size: 0.875rem;">${policy.eligibility}</p>
        </div>
        <div style="background: var(--primary-light); padding: 14px; border-radius: var(--radius-md);">
          <strong style="color: var(--primary); display: block; font-size: 0.9375rem; margin-bottom: 4px;">🎁 지원 혜택 및 내용</strong>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-main);">${policy.support}</p>
        </div>
        <div>
          <span style="font-size: 0.8125rem; color: var(--text-muted);">운영 및 주관 기관: <strong>${policy.org}</strong></span>
        </div>
      </div>
    `;

    elements.modalActionBtn.setAttribute('href', policy.link);
    elements.policyModal.classList.add('open');
    elements.policyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePolicyModal() {
    if (!elements.policyModal) return;
    elements.policyModal.classList.remove('open');
    elements.policyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModalListeners() {
    if (elements.modalCloseBtn) elements.modalCloseBtn.addEventListener('click', closePolicyModal);
    if (elements.modalCancelBtn) elements.modalCancelBtn.addEventListener('click', closePolicyModal);

    if (elements.policyModal) {
      elements.policyModal.addEventListener('click', (e) => {
        if (e.target === elements.policyModal) {
          closePolicyModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.policyModal && elements.policyModal.classList.contains('open')) {
        closePolicyModal();
      }
    });
  }

  /* ==========================================================================
     9. 온누리상품권 혜택 계산기 (Interactive Simulator)
     ========================================================================== */
  function updateCalculator(monthlyExpense) {
    state.onnuriExpense = monthlyExpense;

    if (elements.sliderValueText) {
      elements.sliderValueText.textContent = monthlyExpense.toLocaleString('ko-KR');
    }

    const annualDiscount = monthlyExpense * 12 * 0.10;
    const annualTaxDeduction = monthlyExpense * 12 * 0.40;
    const estimatedTaxSaving = annualTaxDeduction * 0.15;
    const totalBenefit = annualDiscount + estimatedTaxSaving;

    if (elements.instantDiscountAnnual) {
      elements.instantDiscountAnnual.textContent = annualDiscount.toLocaleString('ko-KR') + '원/년';
    }
    if (elements.taxDeductionAnnual) {
      elements.taxDeductionAnnual.textContent = annualTaxDeduction.toLocaleString('ko-KR') + '원/년';
    }
    if (elements.totalAnnualSavings) {
      elements.totalAnnualSavings.textContent = Math.round(totalBenefit).toLocaleString('ko-KR');
    }
  }

  function initCalculator() {
    if (!elements.expenseSlider) return;

    elements.expenseSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      updateCalculator(val);
    });

    elements.quickAmtBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        elements.expenseSlider.value = val;
        updateCalculator(val);
      });
    });

    updateCalculator(state.onnuriExpense);
  }

  /* ==========================================================================
     10. 최신 뉴스 기사 렌더링 & 검색/필터 (실제 기사 URL 삽입)
     ========================================================================== */
  function renderNews() {
    if (!elements.newsGrid) return;

    const filtered = NEWS_DATA.filter(item => {
      const catMatch = state.newsCategory === 'all' || item.category === state.newsCategory;
      const query = state.newsSearchQuery.trim().toLowerCase();
      const textMatch = !query || 
                        item.title.toLowerCase().includes(query) || 
                        item.snippet.toLowerCase().includes(query) ||
                        item.source.toLowerCase().includes(query);
      return catMatch && textMatch;
    });

    if (filtered.length === 0) {
      elements.newsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">검색된 뉴스 기사가 없습니다.</p>
          <p style="font-size: 0.875rem;">다른 검색어를 입력하시거나 상단 공식 보도자료 바로가기를 이용하세요.</p>
        </div>
      `;
      return;
    }

    elements.newsGrid.innerHTML = filtered.map(item => `
      <article class="news-card">
        <div class="news-card-header">
          <span class="news-source-badge">${item.source}</span>
          <span class="news-date">${item.date}</span>
        </div>
        <h3 class="news-title">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
        </h3>
        <p class="news-snippet">${item.snippet}</p>
        <div class="news-card-footer">
          <span class="news-category-tag">#${item.categoryLabel}</span>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-link-btn" title="해당 언론사/공식 누리집 원문 페이지로 이동합니다">
            <span>기사 원문 보기</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </article>
    `).join('');
  }

  function initNewsListeners() {
    if (elements.newsFilters) {
      elements.newsFilters.querySelectorAll('.news-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.newsFilters.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.newsCategory = btn.getAttribute('data-cat');
          renderNews();
        });
      });
    }

    if (elements.newsSearchInput) {
      elements.newsSearchInput.addEventListener('input', (e) => {
        state.newsSearchQuery = e.target.value;
        renderNews();
      });
    }
  }

  /* ==========================================================================
     11. 알기 쉬운 용어 사전 렌더링
     ========================================================================== */
  function renderDictionary() {
    if (!elements.dictGrid) return;

    elements.dictGrid.innerHTML = DICT_DATA.map(item => `
      <div class="dict-card">
        <h4 class="dict-term">${item.term}</h4>
        <div class="dict-sub">${item.sub}</div>
        <p class="dict-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  /* ==========================================================================
     12. 통합 검색바 기능 (Hero Search Bar)
     ========================================================================== */
  function initGlobalSearch() {
    if (!elements.globalSearchInput) return;

    const performSearch = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        if (elements.clearSearchBtn) elements.clearSearchBtn.classList.remove('visible');
        return;
      }

      if (elements.clearSearchBtn) elements.clearSearchBtn.classList.add('visible');

      if (elements.newsSearchInput) {
        elements.newsSearchInput.value = q;
        state.newsSearchQuery = q;
        renderNews();
      }

      state.targetFilter = 'all';
      state.topicFilter = 'all';
      if (elements.targetFilters) {
        elements.targetFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        const allBtn = elements.targetFilters.querySelector('[data-type="all"]');
        if (allBtn) allBtn.classList.add('active');
      }
      if (elements.topicFilters) {
        elements.topicFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        const allChip = elements.topicFilters.querySelector('[data-topic="all"]');
        if (allChip) allChip.classList.add('active');
      }

      renderPolicies();

      if (q.includes('진단') || q.includes('설문') || q.includes('도움')) {
        document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
        showToast('혜택 자가진단 설문 섹션으로 이동했습니다.');
      } else if (q.includes('온누리') || q.includes('상품권')) {
        document.getElementById('onnuri')?.scrollIntoView({ behavior: 'smooth' });
        showToast('온누리상품권 혜택 시뮬레이터로 이동했습니다.');
      } else if (q.includes('뉴스') || q.includes('기사')) {
        document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
        showToast('최신 뉴스 섹션으로 이동했습니다.');
      } else {
        document.getElementById('finder')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`'${q}' 관련 정책 결과를 조회했습니다.`);
      }
    };

    elements.globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performSearch(elements.globalSearchInput.value);
      }
    });

    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        elements.globalSearchInput.value = '';
        elements.clearSearchBtn.classList.remove('visible');
        if (elements.newsSearchInput) {
          elements.newsSearchInput.value = '';
          state.newsSearchQuery = '';
          renderNews();
        }
      });
    }

    elements.tagChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const keyword = chip.getAttribute('data-search');
        elements.globalSearchInput.value = keyword;
        performSearch(keyword);
      });
    });
  }

  /* ==========================================================================
     13. 토스트 알림 헬퍼
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 3000);
  }

  /* ==========================================================================
     14. 앱 초기화 (DOM 준비 완료 시 실행)
     ========================================================================== */
  function initApp() {
    initTheme();
    initNavigation();
    initDutyTabs();
    initSurvey();
    initFinderFilters();
    renderPolicies();
    initModalListeners();
    initCalculator();
    initNewsListeners();
    renderNews();
    renderDictionary();
    initGlobalSearch();

    console.log('%c중소벤처기업부 소개 웹 앱이 성공적으로 준비되었습니다.', 'color: #004ea2; font-size: 14px; font-weight: bold;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
