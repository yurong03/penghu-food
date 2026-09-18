// 澎湖鮮食智慧飲食指南
// GitHub Pages 可直接執行的純 HTML/CSS/JavaScript 版本。
// 天氣：Open-Meteo（免 API Key）
// 注意：食材營養數值目前預留為「待補資料」，不要把示範值當成醫療或營養建議。

const CATEGORY_DATA = {
  "蔬菜": [
    "風茹草（香茹）",
    "澎湖冰花",
    "白膜花生",
    "澎湖稜角絲瓜",
    "青江菜",
    "紅蘿蔔",
    "杏鮑菇",
    "牛心蕃茄",
    "大黃瓜",
    "小黃瓜",
    "甜玉米",
    "蒸彩虹糯玉米",
    "南瓜",
    "澎湖南瓜",
    "甜椒",
    "玉米筍",
    "青花菜",
    "綠萵苣",
    "紅萵苣",
    "嫩葉生菜",
    "澎湖絲瓜",
    "外場絲瓜",
    "白蘿蔔",
    "馬鈴薯",
    "雞蛋"
  ],
  "魚類": [
    "澎湖肉魚",
    "公香魚",
    "午仔魚",
    "產銷履歷-午仔魚（蝴蝶切）",
    "去刺虱目魚整尾",
    "熟魩仔魚",
    "爆卵香魚",
    "特級秋刀魚",
    "紅甘魚",
    "薄鹽花鯖魚",
    "黃金鯧",
    "龍虎石斑",
    "澎湖七星仔",
    "澎湖耳帶蝶魚",
    "澎湖玳瑁石斑",
    "澎湖剝皮魚",
    "澎湖倒吊魚",
    "澎湖加網魚",
    "澎湖加志魚",
    "澎湖哇米魚",
    "澎湖午仔魚",
    "澎湖國光魚",
    "澎湖嘉鱲魚",
    "澎湖寒鯛",
    "澎湖烏尾冬",
    "澎湖石鮱魚",
    "澎湖石鱸",
    "澎湖秋姑魚",
    "澎湖紅新娘",
    "澎湖紅盤魚",
    "澎湖紅目鰱",
    "澎湖紅鰷",
    "澎湖赤筆仔",
    "澎湖黃錫鯛",
    "澎湖青嘴龍占",
    "澎湖黃雞魚",
    "澎湖黑點魚",
    "澎湖龍占魚",
    "澎湖黑鯧",
    "澎湖鶯歌魚",
    "澎湖黃石斑",
    "澎湖馬鞭魚",
    "澎湖貓仔崎",
    "澎湖臭肚魚",
    "澎湖老鼠斑"
  ],
  "蝦類": [
    "大明蝦",
    "黃金大明蝦",
    "劍蝦",
    "火燒蝦（金鉤蝦）",
    "沙蝦",
    "澎湖明蝦",
    "澎湖火燒蝦（狗蝦）",
    "澎湖蘆蝦",
    "澎湖野生龍蝦"
  ],
  "蟹類": [
    "澎湖三點蟹",
    "澎湖扁蟹",
    "澎湖野生花蟹",
    "澎湖野生石蟹"
  ],
  "貝類": [
    "大文蛤",
    "淺蜊",
    "澎湖嬌仔螺",
    "澎湖沙蛤",
    "澎湖牡蠣",
    "澎湖鑰匙螺"
  ],
  "頭足類": [
    "澎湖小卷",
    "澎湖透抽",
    "澎湖爆卵冰卷",
    "澎湖小管"
  ],
  "海藻類": [
    "澎湖海菜"
  ],
  "肉類": [
    "豬肉",
    "雞肉",
    "牛肉",
    "羊肉"
  ],
  "水果": [
    "葡萄",
    "嘉寶瓜（澎湖特有西瓜）",
    "洋香瓜",
    "香瓜茄（澎湖俗稱：楊梅）",
    "仙人掌",
    "紅龍果",
    "蘋果",
    "香蕉",
    "柳丁",
    "橘子",
    "西瓜",
    "柚子",
    "芭樂",
    "草莓",
    "番茄",
    "櫻桃",
    "鳳梨",
    "奇異果",
    "芒果",
    "木瓜",
    "水蜜桃",
    "釋迦",
    "水梨",
    "龍眼",
    "酪梨",
    "荔枝",
    "蓮霧",
    "藍莓",
    "百香果",
    "李子"
  ],
  "乾貨": [
    "石鮔",
    "丁香魚及臭肉鰛乾",
    "菜豆乾",
    "鯊魚翅"
  ],
  "醃漬食品": [
    "高麗菜酸",
    "酸瓜仔（望安酸瓜）",
    "花椰菜酸（花菜乾）"
  ]
};

const foodEmoji = {
  "蔬菜":"🥬","魚類":"🐟","蝦類":"🦐","蟹類":"🦀","貝類":"🦪",
  "頭足類":"🦑","海藻類":"🌿","肉類":"🥩","水果":"🍉","乾貨":"🥫","醃漬食品":"🥬"
};

const seasonNames = {春:"春季",夏:"夏季",秋:"秋季",冬:"冬季"};

// 只把可從名稱直接判斷的「澎湖」標籤標成澎湖；其他來源不要硬猜。
const sourceInfo = (name) => name.includes("澎湖") ? "澎湖（依實際供應批次確認）" : "來源待確認";

const allergenByCategory = {
  "魚類":["魚類"],
  "蝦類":["甲殼類"],
  "蟹類":["甲殼類"],
  "貝類":["軟體動物"],
  "頭足類":["軟體動物"],
  "肉類":[],
  "蔬菜":[],
  "海藻類":[],
  "水果":[],
  "乾貨":[],
  "醃漬食品":[]
};

const allergyKeys = {
  fish:"魚類",
  shellfish:"甲殼類",
  mollusk:"軟體動物",
  peanut:"花生",
  egg:"蛋",
  gluten:"麩質"
};

function iconForCategory(category) {
  return foodEmoji[category] || "🍽️";
}

function defaultSeason(name, category) {
  // 不確定的食材標成「依供應」，避免假裝知道精確產季。
  const special = {
    "澎湖小卷":["夏"],
    "澎湖透抽":["夏"],
    "澎湖小管":["夏"],
    "澎湖爆卵冰卷":["夏"],
    "澎湖稜角絲瓜":["夏"],
    "澎湖絲瓜":["夏"],
    "外場絲瓜":["夏"],
    "嘉寶瓜（澎湖特有西瓜）":["夏"],
    "仙人掌":["夏"],
    "紅龍果":["夏","秋"],
    "西瓜":["夏"],
    "芒果":["夏"],
    "荔枝":["夏"],
    "鳳梨":["夏"],
    "百香果":["夏","秋"],
    "龍眼":["夏","秋"],
    "水蜜桃":["夏"],
    "李子":["夏"],
    "葡萄":["夏","秋"],
    "洋香瓜":["夏"],
    "番茄":["春","夏","秋"],
    "牛心蕃茄":["春","夏","秋"],
    "甜玉米":["春","夏","秋"],
    "南瓜":["春","夏","秋"],
    "澎湖南瓜":["春","夏","秋"]
  };
  if (special[name]) return special[name];
  return ["春","夏","秋","冬"];
}

function mealTypes(category) {
  if (category === "水果") return ["早餐","點心"];
  if (["乾貨","醃漬食品"].includes(category)) return ["早餐","午餐","晚餐"];
  if (category === "蔬菜" || category === "海藻類") return ["早餐","午餐","晚餐"];
  return ["午餐","晚餐"];
}

function buildFoods() {
  const list = [];
  Object.entries(CATEGORY_DATA).forEach(([category,names]) => {
    names.forEach(name => {
      list.push({
        id: name,
        name,
        category,
        emoji: iconForCategory(category),
        source: sourceInfo(name),
        seasons: defaultSeason(name, category),
        allergens: [...(allergenByCategory[category] || [])],
        cooking: cookingFor(category, name),
        meals: mealTypes(category),
        nutrition: {
          calories:"待補",
          protein:"待補",
          fat:"待補",
          carbs:"待補",
          sodium:"待補"
        }
      });
    });
  });
  // 特別標記花生與蛋。
  list.forEach(f => {
    if (f.name === "白膜花生") f.allergens.push("花生");
    if (f.name === "雞蛋") f.allergens.push("蛋");
    if (f.name === "菜豆乾" || f.name.includes("麥")) f.allergens.push("麩質");
    if (["丁香魚及臭肉鰛乾","薄鹽花鯖魚","熟魩仔魚","鯊魚翅"].includes(f.name)) f.notes="加工／乾製／鹽製方式可能影響鈉含量，實際依包裝標示。";
    if (["高麗菜酸","酸瓜仔（望安酸瓜）","花椰菜酸（花菜乾）"].includes(f.name)) f.notes="醃漬食品，選購時可查看鈉含量與包裝標示。";
  });
  return list;
}

function cookingFor(category, name) {
  if (category === "魚類") return ["清蒸","煮湯","乾煎","鹽烤"];
  if (category === "蝦類") return ["清蒸","水煮","快炒"];
  if (category === "蟹類") return ["清蒸","水煮","煮湯"];
  if (category === "貝類") return ["煮湯","清蒸","快炒"];
  if (category === "頭足類") return ["川燙","清蒸","快炒"];
  if (category === "海藻類") return ["涼拌","煮湯","快炒"];
  if (category === "蔬菜") return ["清炒","汆燙","煮湯","蒸"];
  if (category === "肉類") return ["煎","炒","煮","烤"];
  if (category === "水果") return ["直接食用","沙拉","果汁/飲品"];
  if (category === "乾貨") return ["煮湯","泡發後料理"];
  return ["配菜","煮湯","拌炒"];
}

const foods = buildFoods();
let currentWeather = {
  temp:29, feels:32, humidity:75, wind:15, rain:20, code:1, isDay:1
};
let selectedSeason = getSeason(new Date().getMonth()+1);

let health = loadHealth();

function getSeason(month) {
  if ([3,4,5].includes(month)) return "春";
  if ([6,7,8].includes(month)) return "夏";
  if ([9,10,11].includes(month)) return "秋";
  return "冬";
}

function getTimePeriod(hour) {
  if (hour < 10) return "早餐";
  if (hour < 14) return "午餐";
  if (hour < 17) return "下午";
  return "晚餐";
}

function weatherText(code) {
  if (code === 0) return "☀️ 晴朗";
  if ([1,2].includes(code)) return "🌤️ 多雲";
  if (code === 3) return "☁️ 陰天";
  if ([45,48].includes(code)) return "🌫️ 霧";
  if ([51,53,55,56,57].includes(code)) return "🌦️ 毛毛雨";
  if ([61,63,65,66,67].includes(code)) return "🌧️ 降雨";
  if ([71,73,75,77].includes(code)) return "❄️ 降雪";
  if ([80,81,82].includes(code)) return "🌦️ 陣雨";
  if ([95,96,99].includes(code)) return "⛈️ 雷雨";
  return "🌤️ 天氣";
}

function weatherType() {
  if (currentWeather.rain >= 60 || [61,63,65,80,81,82,95,96,99].includes(currentWeather.code)) return "rain";
  if (currentWeather.temp >= 30) return "hot";
  if (currentWeather.temp <= 20) return "cool";
  return "normal";
}

function weatherReason(food) {
  const type = weatherType();
  if (type === "hot") {
    if (["蔬菜","水果","頭足類","貝類","海藻類"].includes(food.category))
      return "今日偏熱，清爽、水分較多或適合快速料理的食材可優先考慮。";
    return "今日偏熱，建議採用清蒸、水煮等較清爽的料理方式。";
  }
  if (type === "rain") {
    if (["貝類","魚類","蔬菜","海藻類"].includes(food.category))
      return "今日有降雨，適合安排煮湯、蒸煮等家常料理。";
    return "今日有降雨，可搭配溫熱料理。";
  }
  if (type === "cool") return "今日較涼，適合安排湯品、蒸煮或熱食。";
  return "今日天氣適中，可依季節與個人飲食設定選擇。";
}

function isAllergyBlocked(food) {
  const selected = Object.keys(health.allergies).filter(k => health.allergies[k]).map(k => allergyKeys[k]);
  return food.allergens.some(a => selected.includes(a));
}

function healthWarning(food) {
  const warnings = [];
  if (health.conditions.gout && ["魚類","蝦類","蟹類","貝類","頭足類","肉類","乾貨"].includes(food.category))
    warnings.push("有痛風設定：此類食材可能需要注意嘌呤攝取，請依個人醫囑調整。");
  if (health.conditions.diabetes && food.category === "水果")
    warnings.push("有糖尿病設定：水果仍可作為食物，但建議留意份量與整體碳水。");
  if (health.conditions.bp && (food.category === "乾貨" || food.category === "醃漬食品"))
    warnings.push("有高血壓設定：加工／醃漬食品請特別查看鈉含量。");
  if (health.conditions.kidney && ["魚類","蝦類","蟹類","貝類","肉類","乾貨"].includes(food.category))
    warnings.push("有腎臟病設定：鉀、磷與蛋白質需求需依醫療人員建議。");
  if (food.notes) warnings.push(food.notes);
  return warnings;
}

function scoreFood(food) {
  let score = 0;
  const reasons = [];

  if (food.seasons.includes(selectedSeason)) {
    score += 3;
    if (food.seasons.length < 4) reasons.push(`${seasonNames[selectedSeason]}供應條件較值得優先查看`);
  }

  if (food.source.includes("澎湖")) {
    score += 2;
    reasons.push("名稱標示澎湖");
  }

  const type = weatherType();
  if (type === "hot" && ["蔬菜","水果","頭足類","貝類","海藻類"].includes(food.category)) {
    score += 2; reasons.push("較適合炎熱天氣的清爽選擇");
  }
  if (type === "rain" && ["魚類","貝類","蔬菜","海藻類"].includes(food.category)) {
    score += 2; reasons.push("適合雨天的蒸煮／湯品");
  }
  if (type === "cool" && ["魚類","貝類","蔬菜","肉類"].includes(food.category)) {
    score += 2; reasons.push("適合較涼天氣的熱食");
  }

  const period = getTimePeriod(new Date().getHours());
  if (food.meals.includes(period)) {
    score += 1;
    reasons.push(`適合${period}安排`);
  }

  if (healthWarning(food).length) score -= 1;
  if (isAllergyBlocked(food)) score -= 100;

  return {score, reasons};
}

function renderFoodCard(food, compact=false) {
  const result = scoreFood(food);
  const blocked = isAllergyBlocked(food);
  const reason = result.reasons.slice(0,2).join("；") || "可查看食材詳細資料與料理方式";
  return `
    <article class="food-card ${blocked ? "blocked":""}">
      <div class="food-card-body">
        <div class="food-top">
          <span class="category-tag">${food.emoji} ${food.category}</span>
          <span class="source-tag">${food.source.includes("澎湖") ? "🌊 澎湖" : "📍 待確認"}</span>
        </div>
        <h3>${food.name}</h3>
        <p>${food.source}｜季節：${food.seasons.length===4 ? "依供應" : food.seasons.join("、")}</p>
        <div class="reason">
          <strong>${blocked ? "⚠️ 過敏設定排除" : "🌿 推薦理由"}</strong><br>
          ${blocked ? "你的設定包含相關過敏原，系統不列入今日推薦。" : reason}
        </div>
      </div>
      <div class="food-footer">
        <span>${food.allergens.length ? "⚠️ 有過敏原提醒" : "● 可查看詳細資料"}</span>
        <button class="text-btn" onclick="openFood('${escapeAttr(food.id)}')">查看詳情 →</button>
      </div>
    </article>`;
}

function renderRecommendations() {
  const scored = foods
    .map(f => ({food:f, ...scoreFood(f)}))
    .filter(x => x.score > -50)
    .sort((a,b) => b.score-a.score)
    .slice(0,6);

  document.getElementById("recommendGrid").innerHTML =
    scored.map(x => renderFoodCard(x.food)).join("");

  const buy = scored.slice(0,8);
  document.getElementById("buyList").innerHTML = buy.map(x => `
    <div class="buy-item">
      <div class="buy-icon">${x.food.emoji}</div>
      <div>
        <strong>${x.food.name}</strong>
        <small>${x.food.category} · ${Math.max(1,x.score)} 分</small>
      </div>
    </div>`).join("");
}

function renderSeason() {
  const current = selectedSeason;
  document.querySelectorAll(".season-btn").forEach(b => b.classList.toggle("active", b.dataset.season===current));
  const special = foods.filter(f => f.seasons.includes(current) && f.seasons.length < 4).slice(0,12);
  const local = foods.filter(f => f.source.includes("澎湖") && !special.includes(f)).slice(0,8);
  const list = [...special, ...local].filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i).slice(0,16);

  document.getElementById("seasonBanner").innerHTML = `
    <strong>${seasonNames[current]}</strong>｜
    目前月份為 ${new Date().getMonth()+1} 月。
    系統會優先顯示有季節標記的食材；沒有足夠資料的食材會標示「依供應」，
    避免把不確定的產季當成固定事實。
  `;
  document.getElementById("seasonGrid").innerHTML = list.map(f => renderFoodCard(f)).join("");
}

function renderFoods() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const source = document.getElementById("sourceFilter").value;
  const allergy = document.getElementById("allergenFilter").value;

  const filtered = foods.filter(f => {
    const matchQ = !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
    const matchCat = cat==="全部" || f.category===cat;
    const matchSource = source==="全部" ||
      (source==="澎湖" && f.source.includes("澎湖")) ||
      (source==="待確認" && !f.source.includes("澎湖"));
    const matchAllergy = allergy==="全部" || f.allergens.includes(allergy);
    return matchQ && matchCat && matchSource && matchAllergy;
  });

  document.getElementById("foodCountText").textContent = `共 ${foods.length} 項食材，目前顯示 ${filtered.length} 項`;
  document.getElementById("foodGrid").innerHTML = filtered.map(f => renderFoodCard(f,true)).join("") ||
    `<div class="info-box">找不到符合條件的食材。</div>`;
}

function openFood(id) {
  const food = foods.find(f => f.id === id);
  if (!food) return;
  const warnings = healthWarning(food);
  document.getElementById("foodModalContent").innerHTML = `
    <div class="detail-header">
      <span class="category-tag">${food.emoji} ${food.category}</span>
      <h2>${food.name}</h2>
      <div class="detail-sub">${food.source}</div>
    </div>

    <div class="detail-grid">
      <div class="detail-stat"><span>熱量／100g</span><strong>${food.nutrition.calories}</strong></div>
      <div class="detail-stat"><span>蛋白質／100g</span><strong>${food.nutrition.protein}</strong></div>
      <div class="detail-stat"><span>脂肪／100g</span><strong>${food.nutrition.fat}</strong></div>
    </div>

    <div class="detail-section">
      <h4>📅 季節與用途</h4>
      <div class="chips">
        <span class="chip">季節：${food.seasons.length===4 ? "依供應" : food.seasons.join("、")}</span>
        ${food.meals.map(m=>`<span class="chip">${m}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h4>🍳 適合料理</h4>
      <div class="chips">${food.cooking.map(x=>`<span class="chip">${x}</span>`).join("")}</div>
    </div>

    <div class="detail-section">
      <h4>⚠️ 過敏與飲食提醒</h4>
      <div class="${food.allergens.length || warnings.length ? "warning":""}">
        ${food.allergens.length ? "過敏原：" + food.allergens.join("、") : "目前資料沒有標示分類過敏原。"}
        ${warnings.length ? "<br>" + warnings.join("<br>") : ""}
      </div>
    </div>

    <div class="detail-section">
      <h4>🌊 澎湖資訊</h4>
      <p class="detail-sub">
        名稱含「澎湖」者，在本網站先作為澎湖相關標籤；
        實際產地、野生／養殖、供應批次仍應以產品標示或資料來源確認。
      </p>
    </div>

    <div class="detail-section">
      <h4>🤖 今日推薦判斷</h4>
      <p class="detail-sub">${weatherReason(food)} 健康設定會另外影響排序。</p>
    </div>
  `;
  document.getElementById("foodModal").classList.remove("hidden");
}

function escapeAttr(s) {
  return s.replace(/'/g, "\\'");
}

function loadHealth() {
  try {
    return JSON.parse(localStorage.getItem("penghuHealth")) || defaultHealth();
  } catch(e) {
    return defaultHealth();
  }
}

function defaultHealth() {
  return {
    conditions: {gout:false,diabetes:false,bp:false,kidney:false},
    allergies: {fish:false,shellfish:false,mollusk:false,peanut:false,egg:false,gluten:false}
  };
}

function syncHealthUI() {
  document.querySelectorAll("[data-health]").forEach(el => el.checked = !!health.conditions[el.dataset.health]);
  document.querySelectorAll("[data-allergy]").forEach(el => el.checked = !!health.allergies[el.dataset.allergy]);
  document.querySelectorAll("[data-modal-health]").forEach(el => el.checked = !!health.conditions[el.dataset.modalHealth]);
  document.querySelectorAll("[data-modal-allergy]").forEach(el => el.checked = !!health.allergies[el.dataset.modalAllergy]);
  const active = [
    ...Object.entries(health.conditions).filter(([,v])=>v).map(([k])=>({gout:"痛風",diabetes:"糖尿病",bp:"高血壓",kidney:"腎臟病"}[k])),
    ...Object.entries(health.allergies).filter(([,v])=>v).map(([k])=>allergyKeys[k])
  ];
  document.getElementById("healthSummary").innerHTML = active.length
    ? `<strong>目前已套用：</strong>${active.join("、")}`
    : `<strong>目前沒有特殊限制。</strong>你可以設定過敏原或飲食控制，系統會調整推薦。`;
}

function readHealthFromUI(modal=false) {
  const result = defaultHealth();
  document.querySelectorAll(modal ? "[data-modal-health]" : "[data-health]").forEach(el => result.conditions[el.dataset.modalHealth || el.dataset.health] = el.checked);
  document.querySelectorAll(modal ? "[data-modal-allergy]" : "[data-allergy]").forEach(el => result.allergies[el.dataset.modalAllergy || el.dataset.allergy] = el.checked);
  health = result;
  localStorage.setItem("penghuHealth", JSON.stringify(health));
  syncHealthUI();
  renderRecommendations();
  renderFoods();
}

async function fetchWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=23.57&longitude=119.57&timezone=Asia%2FTaipei&forecast_days=1&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&hourly=precipitation_probability";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather API error");
    const data = await res.json();
    currentWeather.temp = Math.round(data.current.temperature_2m);
    currentWeather.feels = Math.round(data.current.apparent_temperature);
    currentWeather.humidity = Math.round(data.current.relative_humidity_2m);
    currentWeather.wind = Math.round(data.current.wind_speed_10m);
    currentWeather.code = data.current.weather_code;
    currentWeather.isDay = data.current.is_day;

    const now = new Date();
    const hour = now.getHours();
    currentWeather.rain = Math.round(data.hourly?.precipitation_probability?.[hour] ?? 0);

    document.getElementById("temp").textContent = currentWeather.temp;
    document.getElementById("feels").textContent = currentWeather.feels;
    document.getElementById("humidity").textContent = currentWeather.humidity;
    document.getElementById("wind").textContent = currentWeather.wind;
    document.getElementById("rain").textContent = currentWeather.rain;
    document.getElementById("weatherTitle").textContent = weatherText(currentWeather.code);
    document.getElementById("weatherTag").textContent = `${weatherText(currentWeather.code)} ${currentWeather.temp}°C`;
    document.getElementById("heroText").textContent =
      `系統已取得澎湖即時天氣，結合目前時間、${seasonNames[selectedSeason]}與你的健康設定計算推薦。`;
  } catch(e) {
    document.getElementById("weatherTitle").textContent = "⚠️ 天氣資料暫時無法取得";
    document.getElementById("weatherSource").textContent = "請確認網路連線；推薦仍會使用季節與時間計算。";
  }
  renderRecommendations();
}

function updateDateTime() {
  const now = new Date();
  const dateText = now.toLocaleDateString("zh-TW",{
    year:"numeric",month:"long",day:"numeric",weekday:"long"
  });
  const timeText = now.toLocaleTimeString("zh-TW",{
    hour:"2-digit",minute:"2-digit",second:"2-digit"
  });
  document.getElementById("todayDate").textContent = `${dateText}｜${timeText}`;
  selectedSeason = getSeason(now.getMonth()+1);
  document.getElementById("seasonTag").textContent = `📅 ${seasonNames[selectedSeason]}`;
  document.getElementById("timeTag").textContent = `🕐 ${timeText} · ${getTimePeriod(now.getHours())}`;
}

function switchSection(id) {
  document.querySelectorAll(".page-section").forEach(s => s.classList.toggle("active", s.id===id));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.section===id));
  if (id === "foods") renderFoods();
  if (id === "seasons") renderSeason();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchSection(btn.dataset.section));
});
document.querySelectorAll(".season-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedSeason = btn.dataset.season;
    renderSeason();
  });
});
document.getElementById("searchInput").addEventListener("input", renderFoods);
document.getElementById("categoryFilter").addEventListener("change", renderFoods);
document.getElementById("sourceFilter").addEventListener("change", renderFoods);
document.getElementById("allergenFilter").addEventListener("change", renderFoods);

document.getElementById("refreshWeather").addEventListener("click", fetchWeather);
document.getElementById("openAllFoods").addEventListener("click", () => switchSection("foods"));

document.getElementById("healthBtn").addEventListener("click", () => {
  syncHealthUI();
  document.getElementById("healthModal").classList.remove("hidden");
});
document.getElementById("saveHealth").addEventListener("click", () => readHealthFromUI(false));
document.getElementById("saveHealthModal").addEventListener("click", () => {
  readHealthFromUI(true);
  document.getElementById("healthModal").classList.add("hidden");
});
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => document.getElementById(btn.dataset.close).classList.add("hidden"));
});
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});

syncHealthUI();
updateDateTime();
renderRecommendations();
renderSeason();
renderFoods();
fetchWeather();
setInterval(updateDateTime,1000);
setInterval(fetchWeather,10*60*1000);
