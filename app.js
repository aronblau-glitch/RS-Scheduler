
const PASSWORDS = {
  'admin': 'admin123',
  'office': 'office123',
  'Goldberger - SLP': 'gold1','Friedman - SLP': 'fried1','Zeigler - SLP': 'zeig1',
  'Horowitz - SLP': 'horo1','Herbst - SLP': 'herb1','Malks - OT': 'malk1',
  'Dyckman - OT': 'dyck1','Fischer- CO': 'fisch1','Kerenkraut - CO': 'keren1',
  'Werner - CO': 'wern1','Weber - CO': 'web1','Fayersteyn - CO': 'fayer1'
};
const PROVIDERS = [
  'Goldberger - SLP','Friedman - SLP','Zeigler - SLP','Horowitz - SLP','Herbst - SLP',
  'Malks - OT','Dyckman - OT','Fischer- CO','Kerenkraut - CO','Werner - CO','Weber - CO','Fayersteyn - CO'
];
const DAYS_ORDER = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
const RAW = [
["Sunday", 0.3854166666666667, "Breakfast", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.40625, "Breakfast", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.4270833333333333, "Breakfast", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.4479166666666667, "1st session", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.46875, "Break", "", "Sofer Yiddi", "", "", "", "", "", "", "", "", "Twersky Shia", "Twersky Shia"],
["Sunday", 0.4895833333333333, "2nd Session", "", "Reich Avraham Shimon", "", "", "", "", "", "", "", "", "Teichman Yidel", "Teichman Yidel"],
["Sunday", 0.5104166666666666, "2nd Session", "", "Freund Eli", "", "", "", "", "", "", "", "", "Gestetner Efraim", "Gestetner Efraim"],
["Sunday", 0.53125, "3rd Session", "", "Schwartz Moshe", "", "", "", "", "", "", "", "", "Briskman Isaac", "Briskman Isaac"],
["Sunday", 0.552083333333334, "Lunch", "", "Kuperman Favi", "", "", "", "", "", "", "", "", "Hollander Hershy", "Hollander Hershy"],
["Sunday", 0.572916666666667, "Lunch", "", "Braver, Naftuli Hersk", "", "", "", "", "", "", "", "", "Lowenbraun, Eli", "Lowenbraun, Eli"],
["Sunday", 0.59375, "English", "", "Reinhold, Baruch", "", "", "", "", "", "", "", "", "Slomiuc Yehuda", "Slomiuc Yehuda"],
["Sunday", 0.614583333333333, "Break", "", "Sekula Hirsch Meir", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.635416666666667, "Math", "", "Weinberger Rafael", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.656249999999999, "Science", "", "Pollack Smiel", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.677083333333332, "Event", "", "Fogel Efraim", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.697916666666665, "Break", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.718749999999998, "social skill group 1", "", "", "", "", "", "", "", "", "", "", "", ""],
["Sunday", 0.739583333333331, "social skill group 2", "", "", "", "", "", "", "", "", "", "", "", ""],
["Monday", 0.3854166666666667, "Breakfast", "", "", "", "", "Lowenbraun, Eli", "", "Weiss Shimon", "", "", "", "", ""],
["Monday", 0.40625, "1st session", "", "", "", "", "Jeremias Joseph", "", "Pollack Hershy", "", "", "", "", ""],
["Monday", 0.4270833333333333, "Break", "", "", "", "Axelrod, Levi Yitzchok", "Schlesinger Avraham", "", "Schwartz Shimon", "Briskman David", "", "Kuperman Favi", "", ""],
["Monday", 0.4479166666666667, "2nd Session", "", "", "Flam Pinchas", "Mermelstein Yaakov", "Stern Shimon", "", "Rosinger Mordechai", "Axelrod, Levi Yitzchok", "", "Reinhold, Baruch", "", ""],
["Monday", 0.46875, "2nd Session", "", "", "Weiss Shimon", "Abramson, Yochonon", "Herman Zvi", "", "Schlesinger Avraham", "Hershkowitz Yanky", "", "Kaufman Yisroel Meir", "", ""],
["Monday", 0.4895833333333333, "3rd Session", "", "", "Abramowitz Nechemia", "Abramowits Shimon", "Bergman Moishe", "", "Sofer Yiddi", "Klein Mendy", "", "Markowitz Cheskel", "", ""],
["Monday", 0.5104166666666666, "Lunch", "", "", "Schwartz Shimon", "Pollak Shmuel (2)", "Gestetner Efraim", "", "Freund Eli", "Mermelstein Yaakov", "", "Rosinger Mordechai", "", ""],
["Monday", 0.53125, "Lunch", "", "", "Wigder Matis", "Babad Joseph", "Halberstam Hersh Meilech", "", "Sekula Hirsch Meir", "Schlesinger Avraham", "", "Pollack Hershy", "", ""],
["Monday", 0.5520833333333334, "English", "", "", "Pollack Hershy", "Brown Meir", "Kish, Yitzchok", "", "Braver, Naftuli Hersk", "Parnes Volvi", "", "Fogel Efraim", "", ""],
["Monday", 0.5729166666666666, "Break", "", "", "Oberlander Eli", "Ehrenfeld Usher", "Schwartz Joel", "", "Silberman Moishe", "Prero, Shloimy", "", "Reichberg Yizchok", "", ""],
["Monday", 0.59375, "Math", "", "", "Slomiuc Yehuda", "Fisch, Moshe", "", "", "Kuperman Favi", "Goldhirsch Avrohom Simcha", "", "Toub Zisman", "", ""],
["Monday", 0.614583333333333, "Science", "", "", "Briskman David", "Spitzer, Moshe Zev", "", "", "Lichtenstein Abraham", "Kaufman, Shimmy", "", "Briskman Shimon", "", ""],
["Monday", 0.635416666666667, "Event", "", "", "Briskman Shimon", "Stern Shulem", "", "", "Rothstein Mendy", "Flam Pinchas", "", "Herman Zvi", "", ""],
["Monday", 0.65625, "Event", "", "", "Klein Mendy", "Kanner Yehudah", "", "", "", "Weinberger Rafael", "", "Ehrenfeld Usher", "", ""],
["Monday", 0.677083333333333, "social skill group 1", "", "", "Parnes Volvi", "Levine, Reuven", "", "", "Kaufman Yisroel Meir", "Weberman Elimelach", "", "Kraminar Leiby", "", ""],
["Monday", 0.697916666666666, "social skill group 2", "", "", "Kraminar Leiby", "Stein, Levi Yitzchok", "", "", "Markowitz Cheskel", "Kish, Yitzchok", "", "", "", ""],
["Monday", 0.718749999999999, "social skill group 3", "", "", "Salamon Jacob", "Brull Yeshoshua", "", "", "Twersky Shia", "Kanner Yehudah", "", "", "", ""],
["Monday", 0.739583333333332, "Breakfast", "", "", "", "Feigenbaum Shalom", "", "", "", "Schnitzler, Mordechai", "", "", "", ""],
["Tuesday", 0.3854166666666667, "1st session", "", "", "", "", "", "Weinberger Rafael", "Freund Eli", "", "", "", "", ""],
["Tuesday", 0.40625, "Break", "", "", "", "", "", "Pollack Smiel", "Rothstein Mendy", "", "", "", "", ""],
["Tuesday", 0.4270833333333333, "2nd Session", "", "", "", "", "", "Fogel Efraim", "Reich Avraham Shimon", "", "", "Kuperman Favi", "", ""],
["Tuesday", 0.4479166666666667, "2nd Session", "", "", "", "", "", "Epstein Moshe", "Gottlieb Shulem", "", "", "Markowitz Cheskel", "", ""],
["Tuesday", 0.46875, "3rd Session", "", "", "", "", "", "Toub Zisman", "Pollack Hershy", "", "", "Reinhold, Baruch", "", ""],
["Tuesday", 0.4895833333333333, "Lunch", "", "", "", "", "", "Schwartz Joel", "Schwartz Moshe", "", "", "Fogel Efraim", "", ""],
["Tuesday", 0.5104166666666666, "Lunch", "", "", "", "", "", "Levine, Reuven", "Silberman Moishe", "", "", "Toub Zisman", "", ""],
["Tuesday", 0.53125, "English", "", "", "", "", "", "Weberman Elimelach", "Sofer Yiddi", "", "", "Rosinger Mordechai", "", ""],
["Tuesday", 0.5520833333333334, "Break", "", "", "", "", "", "Halberstam Hersh Meilech", "Kaufman Yisroel Meir", "Schwartz Moshe", "", "Pollack Hershy", "", ""],
["Tuesday", 0.572916666666667, "Math", "", "", "", "", "", "Gestetner Efraim", "Braver, Naftuli Hersk", "Reich Avraham Shimon", "", "Briskman Shimon", "", ""],
["Tuesday", 0.59375, "Science", "", "", "", "", "", "Kish, Yitzchok", "Kuperman Favi", "Braver, Naftuli Hersk", "", "Kraminar Leiby", "", ""],
["Tuesday", 0.614583333333333, "Event", "", "", "", "", "", "Spitz Moishe", "Reinhold, Baruch", "Silberman Moishe", "", "Salamon Jacob", "", ""],
["Tuesday", 0.635416666666667, "Break", "", "", "", "", "", "Kanner Yehudah", "Markowitz Cheskel", "Blum Nechemiah", "", "Reichberg Yizchok", "", ""],
["Tuesday", 0.65625, "social skill group 1", "", "", "", "", "", "Stein, Levi Yitzchok", "", "Schlesinger Avraham", "", "Epstein Moshe", "", ""],
["Tuesday", 0.677083333333333, "social skill group 2", "", "", "", "", "", "Brull Yeshoshua", "Lichtenstein Abraham", "Brauner Benzion", "", "", "", ""],
["Tuesday", 0.697916666666667, "social skill group 3", "", "", "", "", "", "Briskman Shimon", "Rosinger Mordechai", "Prero, Shloimy", "", "", "", ""],
["Tuesday", 0.71875, "social skill group 4", "", "", "", "", "", "Wigder Matis", "Blum Nechemiah", "Kaufman, Shimmy", "", "", "", ""],
["Tuesday", 0.739583333333333, "Breakfast", "", "", "", "", "", "Oberlander Eli", "", "Flam Pinchas", "", "", "", ""],
["Wednesday", 0.3854166666666667, "Break", "", "", "", "", "Walk Simcha Bimin", "Fogel Efraim", "Bergman Moishe", "", "", "", "", ""],
["Wednesday", 0.40625, "2nd Session", "", "", "", "", "Twersky Shia", "Toub Zisman", "Epstein Isaac", "", "", "", "", ""],
["Wednesday", 0.4270833333333333, "2nd Session", "", "", "", "Goldhirsch Avrohom Simcha", "Blum Nechemiah", "Kish, Yitzchok", "Fisch, Moshe", "Weinberger Rafael", "", "", "Bergman Moishe", ""],
["Wednesday", 0.4479166666666667, "3rd Session", "", "", "", "Teichman Yidel", "Schlesinger Avraham", "Weinberger Rafael", "Blum Nechemiah", "Weberman Elimelach", "", "", "Epstein Isaac", ""],
["Wednesday", 0.46875, "Lunch", "", "", "", "Brauner Benzion", "Bergman Moishe", "Pollack Smiel", "Walk Simcha Bimin", "Kish, Yitzchok", "", "", "Fisch, Moshe", ""],
["Wednesday", 0.4895833333333333, "Lunch", "", "", "", "Prero, Shloimy", "Weberman Elimelach", "Epstein Moshe", "Teichman Yidel", "Kanner Yehudah", "", "", "Spitzer, Moshe Zev", ""],
["Wednesday", 0.5104166666666666, "English", "", "", "", "Kaufman, Shimmy", "Gestetner Efraim", "Spitz Moishe", "Schlesinger Avraham", "Schnitzler, Mordechai", "", "", "Abramowitz Nechemia", ""],
["Wednesday", 0.53125, "Break", "", "", "", "Brown Meir", "Kish, Yitzchok", "Weberman Elimelach", "Brauner Benzion", "Gestetner Abraham", "", "", "Schwartz Shimon", ""],
["Wednesday", 0.5520833333333334, "Math", "", "", "", "Gottlieb Shulem", "Spitz Moishe", "Halberstam Hersh Meilech", "Prero, Shloimy", "Schwartz Yehudah", "", "", "Brull Yeshoshua", ""],
["Wednesday", 0.572916666666667, "Science", "", "", "", "Epstein Isaac", "Halberstam Hersh Meilech", "Schwartz Joel", "Goldhirsch Avrohom Simcha", "Jeremias Joseph", "", "", "Feigenbaum Shalom", ""],
["Wednesday", 0.59375, "Event", "", "", "", "Fisch, Moshe", "", "Levine, Reuven", "Kaufman, Shimmy", "", "", "", "Oberlander Eli", ""],
["Wednesday", 0.614583333333333, "Break", "", "", "", "Spitzer, Moshe Zev", "", "Brull Yeshoshua", "Stern Shulem", "", "", "", "Fisher Zev", ""],
["Wednesday", 0.635416666666667, "social skill group 1", "", "", "", "Stern Shulem", "", "Kanner Yehudah", "Brown Meir", "", "", "", "Gross Israel", ""],
["Wednesday", 0.65625, "social skill group 2", "", "", "", "Kanner Yehudah", "", "Wigder Matis", "", "", "", "", "Heimfeld Avrohom", ""],
["Wednesday", 0.677083333333333, "social skill group 3", "", "", "", "Levine, Reuven", "", "Stein, Levi Yitzchok", "Gottlieb Shulem", "", "", "", "Salamon Shraga", ""],
["Wednesday", 0.697916666666667, "social skill group 4", "", "", "", "Stein, Levi Yitzchok", "", "Oberlander Eli", "Spitzer, Moshe Zev", "", "", "", "Stern Shimon", ""],
["Wednesday", 0.71875, "social skill group 5", "", "", "", "Brull Yeshoshua", "", "Briskman Shimon", "Flam Pinchas", "", "", "", "Abramson, Yochonon", ""],
["Wednesday", 0.739583333333333, "social skill group 6", "", "", "", "", "", "Feigenbaum Shalom", "", "", "", "", "Pollak Shmuel (2)", ""],
["Thursday", 0.3854166666666667, "Breakfast", "", "", "", "", "Spitz Moishe", "", "Walk Simcha Bimin", "", "", "", "", ""],
["Thursday", 0.40625, "Breakfast", "", "", "", "", "Lowenbraun, Eli", "", "Teichman Yidel", "", "", "", "", ""],
["Thursday", 0.4270833333333333, "Breakfast", "", "Reich Avraham Shimon", "", "Axelrod, Levi Yitzchok", "Jeremias Joseph", "", "Prero, Shloimy", "Gestetner Abraham", "Freund Eli", "", "Bergman Moishe", ""],
["Thursday", 0.4479166666666667, "1st session", "", "Schwartz Moshe", "Flam Pinchas", "Hershkowitz Yanky", "Stern Shimon", "", "Bergman Moishe", "Schwartz Yehudah", "Sofer Yiddi", "", "Epstein Isaac", ""],
["Thursday", 0.46875, "Break", "", "Braver, Naftuli Hersk", "Weiss Shimon", "Mermelstein Yaakov", "Herman Zvi", "", "Epstein Isaac", "Jeremias Joseph", "Lichtenstein Abraham", "", "Fisch, Moshe", ""],
["Thursday", 0.4895833333333333, "2nd Session", "", "Sekula Hirsch Meir", "Schwartz Shimon", "Abramowits Shimon", "Czigler Nathen", "", "Spitzer, Moshe Zev", "Axelrod, Levi Yitzchok", "Rothstein Mendy", "", "Abramowitz Nechemia", ""],
["Thursday", 0.5104166666666666, "2nd Session", "Silberman Moishe", "Pollack Smiel", "Pollack Hershy", "Babad Joseph", "Weberman Elimelach", "", "Stern Shulem", "", "Brown Meir", "", "", ""],
["Thursday", 0.53125, "3rd Session", "Lichtenstein Abraham", "Freund Eli", "Wigder Matis", "Taub Efraim", "Walk Simcha Bimin", "", "Brown Meir", "Hershkowitz Yanky", "Gottlieb Shulem", "", "Schwartz Shimon", ""],
["Thursday", 0.5520833333333334, "Lunch", "Rothstein Mendy", "Sofer Yiddi", "Abramowitz Nechemia", "Abramson, Yochonon", "Twersky Shia", "", "Kaufman, Shimmy", "Mermelstein Yaakov", "Weiss Shimon", "", "Feigenbaum Shalom", ""],
["Thursday", 0.572916666666667, "Lunch", "Kaufman Yisroel Meir", "Reinhold, Baruch", "Briskman Shimon", "Pollak Shmuel (2)", "Blum Nechemiah", "", "Reich Avraham Shimon", "Briskman David", "Spitz Moishe", "", "Oberlander Eli", ""],
["Thursday", 0.59375, "English", "Markowitz Cheskel", "Kuperman Favi", "Oberlander Eli", "Ehrenfeld Usher", "", "", "Fisch, Moshe", "Klein Mendy", "Levine, Reuven", "", "Fisher Zev", ""],
["Thursday", 0.614583333333333, "Break", "Rosinger Mordechai", "Weinberger Rafael", "Briskman David", "Gottlieb Shulem", "", "", "Abramowitz Nechemia", "Parnes Volvi", "Stein, Levi Yitzchok", "", "Gross Israel", ""],
["Thursday", 0.635416666666667, "Math", "Epstein Moshe", "Fogel Efraim", "Klein Mendy", "Kaufman, Shimmy", "", "", "Weiss Shimon", "Brauner Benzion", "Wigder Matis", "", "Heimfeld Avrohom", ""],
["Thursday", 0.65625, "Science", "Toub Zisman", "Schnitzler, Mordechai", "Parnes Volvi", "Prero, Shloimy", "", "", "", "Silberman Moishe", "Lowy Menachem", "", "Salamon Shraga", ""],
["Thursday", 0.677083333333333, "Event", "Briskman Isaac", "Fisher Zev", "Kraminar Leiby", "Epstein Isaac", "", "", "Schwartz Shimon", "Schwartz Moshe", "Abramowits Shimon", "", "Stern Shimon", ""],
["Thursday", 0.697916666666667, "Break", "Hollander Hershy", "Heimfeld Avrohom", "Salamon Jacob", "Goldhirsch Avrohom Simcha", "", "", "Reinhold, Baruch", "", "Taub Efraim", "", "Abramson, Yochonon", ""],
["Thursday", 0.71875, "social skill group 1", "Gestetner Abraham", "Salamon Shraga", "Goldberger Eliyahu", "Brauner Benzion", "", "", "Schwartz Moshe", "Braver, Naftuli Hersk", "", "", "Pollak Shmuel (2)", ""],
["Thursday", 0.739583333333333, "social skill group 2", "Schwartz Yehudah", "Gross Israel", "", "Teichman Yidel", "", "", "", "Reich Avraham Shimon", "", "", "", ""],
["Friday", 0.3854166666666667, "Breakfast", "", "", "", "", "", "", "", "", "", "", "", ""],
["Friday", 0.40625, "Breakfast", "", "", "", "", "", "", "", "", "", "", "", ""],
["Friday", 0.4270833333333333, "Breakfast", "", "Fisher Zev", "", "", "", "", "", "", "", "", "Twersky Shia", "Twersky Shia"],
["Friday", 0.4479166666666667, "1st session", "", "Schnitzler, Mordechai", "", "", "", "", "", "", "", "", "Teichman Yidel", "Teichman Yidel"],
["Friday", 0.46875, "Break", "", "Salamon Shraga", "", "", "", "", "", "", "", "", "Gestetner Efraim", "Gestetner Efraim"],
["Friday", 0.4895833333333333, "2nd Session", "", "Gross Israel", "", "", "", "", "", "", "", "", "Briskman Isaac", "Briskman Isaac"],
["Friday", 0.5104166666666666, "2nd Session", "", "Heimfeld Avrohom", "", "", "", "", "", "", "", "", "Hollander Hershy", "Hollander Hershy"],
["Friday", 0.53125, "3rd Session", "", "", "", "", "", "", "", "", "", "", "Lowenbraun, Eli", "Lowenbraun, Eli"],
["Friday", 0.5520833333333334, "Lunch", "", "", "", "", "", "", "", "", "", "", "Slomiuc Yehuda", "Slomiuc Yehuda"],
];

let currentUser = null;
let adminTab = 'overview';
let sendModalDay = null;
let viewingWeekKey = null; // null = current week; set to past week key when browsing history

function timeStr(dec) {
  const totalMin = Math.round(dec * 24 * 60);
  const h = Math.floor(totalMin / 60), m = totalMin % 60;
  return (h % 12 || 12) + ':' + String(m).padStart(2,'0') + ' ' + (h >= 12 ? 'PM' : 'AM');
}
function getWeekKey() {
  const now = new Date(), sun = new Date(now);
  sun.setDate(now.getDate() - now.getDay());
  return 'week_' + sun.getFullYear() + '_' + sun.getMonth() + '_' + sun.getDate();
}
function getNextSunday() {
  const now = new Date(), next = new Date(now);
  next.setDate(now.getDate() + (7 - now.getDay()));
  return next.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
}
function getWeekRange() {
  const now = new Date(), sun = new Date(now), sat = new Date(now);
  sun.setDate(now.getDate() - now.getDay()); sat.setDate(now.getDate() + (6 - now.getDay()));
  const fmt = d => d.toLocaleDateString('en-US', {month:'short', day:'numeric'});
  return fmt(sun) + ' - ' + fmt(sat);
}
function getTypeClass(p) { return p.includes('SLP') ? 'badge-slp' : p.includes('OT') ? 'badge-ot' : 'badge-co'; }

// Return the week key for N weeks ago (0 = current week)
function weekKeyOffset(offset) {
  const now = new Date();
  const sun = new Date(now);
  sun.setDate(now.getDate() - now.getDay() - offset * 7);
  return 'week_' + sun.getFullYear() + '_' + sun.getMonth() + '_' + sun.getDate();
}
// Return "Jul 6 - Jul 12" label for any week key
function weekRangeFromKey(wk) {
  const parts = wk.replace('week_','').split('_');
  const sun = new Date(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
  const sat = new Date(sun); sat.setDate(sun.getDate() + 6);
  const fmt = d => d.toLocaleDateString('en-US', {month:'short', day:'numeric'});
  return fmt(sun) + ' - ' + fmt(sat);
}
// Get list of past weeks available in Supabase cache keys
function getActiveWeekKey() {
  return viewingWeekKey || getWeekKey();
}
function makeId(day, time, student) { return (day + '_' + time + '_' + student).replace(/[^a-zA-Z0-9]/g, '_'); }

/* --- STORAGE --- */
function getCheckKey(wk,p,d,t,s){ return wk+'||'+p+'||'+d+'||'+t+'||'+s; }
function isChecked(wk,p,d,t,s){ try{ return !!(JSON.parse(localStorage.getItem('checkoffs')||'{}')[getCheckKey(wk,p,d,t,s)]); }catch(e){return false;} }
function toggleCheck(wk,p,d,t,s){ try{ const data=JSON.parse(localStorage.getItem('checkoffs')||'{}'),key=getCheckKey(wk,p,d,t,s); if(data[key])delete data[key];else data[key]=Date.now(); localStorage.setItem('checkoffs',JSON.stringify(data)); }catch(e){} }
function getAbKey(wk,p,d,t,s){ return 'ab||'+wk+'||'+p+'||'+d+'||'+t+'||'+s; }
function isAbsent(wk,p,d,t,s){ try{ return !!(JSON.parse(localStorage.getItem('statuses')||'{}')[getAbKey(wk,p,d,t,s)]); }catch(e){return false;} }
function toggleAbsent(wk,p,d,t,s){
  try{
    const data=JSON.parse(localStorage.getItem('statuses')||'{}'), key=getAbKey(wk,p,d,t,s);
    if(data[key]){ delete data[key]; }
    else{
      data[key]='absent';
      delete data['nc||'+wk+'||'+p+'||'+d+'||'+t+'||'+s];
      const co=JSON.parse(localStorage.getItem('checkoffs')||'{}');
      delete co[getCheckKey(wk,p,d,t,s)];
      localStorage.setItem('checkoffs',JSON.stringify(co));
    }
    localStorage.setItem('statuses',JSON.stringify(data));
  }catch(e){}
}
function getNcKey(wk,p,d,t,s){ return 'nc||'+wk+'||'+p+'||'+d+'||'+t+'||'+s; }
function isNc(wk,p,d,t,s){ try{ return !!(JSON.parse(localStorage.getItem('statuses')||'{}')[getNcKey(wk,p,d,t,s)]); }catch(e){return false;} }
function toggleNc(wk,p,d,t,s){
  try{
    const data=JSON.parse(localStorage.getItem('statuses')||'{}'), key=getNcKey(wk,p,d,t,s);
    if(data[key]){ delete data[key]; }
    else{ data[key]='nc'; delete data[getAbKey(wk,p,d,t,s)]; }
    localStorage.setItem('statuses',JSON.stringify(data));
  }catch(e){}
}

/* --- AUTH --- */
function checkRemembered(){
  try{ const s=localStorage.getItem('rememberedUser'); if(s){ document.getElementById('loginSelect').value=s; document.getElementById('rememberMe').checked=true; } }catch(e){}
}
function doLogin(){
  const sel=document.getElementById('loginSelect').value, pass=document.getElementById('loginPass').value;
  const err=document.getElementById('loginError'), remember=document.getElementById('rememberMe').checked;
  if(!sel){ err.textContent='Please select your name.'; err.style.display='block'; return; }
  if(PASSWORDS[sel]!==pass){ err.style.display='block'; return; }
  err.style.display='none';
  if(remember) localStorage.setItem('rememberedUser',sel); else localStorage.removeItem('rememberedUser');
  currentUser=sel;
  document.getElementById('loginScreen').style.display='none';
  document.getElementById('appScreen').style.display='block';
  document.getElementById('headerName').textContent=sel==='admin'?'Admin':sel;
  if(sel==='admin') showAdminView();
  else if(sel==='office') showOfficeView();
  else showProviderView(sel);
}
function doLogout(){
  currentUser=null;
  document.getElementById('loginScreen').style.display='flex';
  document.getElementById('appScreen').style.display='none';
  document.getElementById('loginPass').value='';
  document.getElementById('providerView').style.display='none';
  document.getElementById('adminView').style.display='none';
  document.getElementById('officeView').style.display='none';
}

/* --- PROVIDER VIEW --- */
function showProviderView(provider){
  const wk=getWeekKey(), pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
  const container=document.getElementById('providerView');
  container.style.display='block';
  document.getElementById('adminView').style.display='none';
  const byDay={};DAYS_ORDER.forEach(d=>byDay[d]=[]);
  let total=0,seen=0,absent=0;
  RAW.forEach(row=>{
    const student=(row[colIdx]||'').trim();
    if(!student||student==='x'||student.startsWith('Group')) return;
    const day=row[0],time=row[1];
    const done=isChecked(wk,provider,day,time,student);
    const ab=isAbsent(wk,provider,day,time,student);
    const nc=isNc(wk,provider,day,time,student);
    byDay[day].push({time,subject:row[2],student,done,absent:ab,nc});
    total++;if(done)seen++;if(ab)absent++;
  });
  let html='<div class="week-banner"><div><div class="week-label">Week of '+getWeekRange()+'</div>'
    +'<div class="week-sub">Checkoffs reset every Sunday</div></div>'
    +'<div class="week-reset-badge">Next reset: '+getNextSunday()+'</div></div>'
    +'<div class="print-bar no-print"><button class="btn-print" onclick="window.print()">Print / Share</button></div>'
    +'<div class="summary-bar">'
    +'<div class="summary-card"><div class="num" id="sumTotal">'+total+'</div><div class="lbl">Total</div></div>'
    +'<div class="summary-card green"><div class="num" id="sumSeen">'+seen+'</div><div class="lbl">Seen</div></div>'
    +'<div class="summary-card orange"><div class="num" id="sumRemain">'+(total-seen-absent)+'</div><div class="lbl">Remaining</div></div>'
    +'<div class="summary-card red"><div class="num" id="sumAbsent">'+absent+'</div><div class="lbl">Absent</div></div>'
    +'</div>';
  DAYS_ORDER.forEach(day=>{
    const sessions=byDay[day];if(!sessions.length)return;
    html+='<div class="day-block"><div class="day-header">'+day+'</div>';
    sessions.forEach(s=>{
      const id=makeId(day,s.time,s.student);
      const rowCls=s.absent?' absent-row':s.nc?' noncompliant-row':s.done?' checked':'';
      const nameStyle=s.done?'text-decoration:line-through;color:#68d391;':s.absent?'color:#c53030;':s.nc?'color:#c05621;':'';
      const pE=provider.replace(/'/g,"\\'"),sE=s.student.replace(/'/g,"\\'");
      const tagHtml=s.absent?'<span class="status-tag absent">Absent</span>':s.nc?'<span class="status-tag nc">Non-Compliant</span>':'<span class="status-tag"></span>';
      html+='<div class="session-row'+rowCls+'" id="row_'+id+'">'
        +'<div class="time-col">'+timeStr(s.time)+'</div>'
        +'<div class="subject-col">'+s.subject+'</div>'
        +'<div class="student-name" id="name_'+id+'" style="'+nameStyle+'">'+s.student+'</div>'
        +tagHtml
        +'<div class="action-btns">'
        +'<button class="check-btn'+(s.done?' done':'')+'" id="btn_'+id+'" title="Seen" onclick="handleCheck(\''+pE+'\',\''+day+'\','+s.time+',\''+sE+'\',\''+id+'\')">'+(s.done?'&#10003;':'')+'</button>'
        +'<button class="absent-btn'+(s.absent?' active':'')+'" id="ab_'+id+'" title="Absent" onclick="handleAbsent(\''+pE+'\',\''+day+'\','+s.time+',\''+sE+'\',\''+id+'\')">&#128683;</button>'
        +'<button class="nc-btn'+(s.nc?' active':'')+'" id="nc_'+id+'" title="Non-Compliant" onclick="handleNc(\''+pE+'\',\''+day+'\','+s.time+',\''+sE+'\',\''+id+'\')">NC</button>'
        +'</div></div>';
    });
    html+='<div class="save-send-bar no-print"><button class="btn-save-send" onclick="openSendModal(\''+provider.replace(/'/g,"\\'")+'\',\''+day+'\')">&#128228; Save &amp; Send &#8212; '+day+'</button></div>';
    html+='</div>';
  });
  container.innerHTML=html;
}

function handleCheck(p,d,t,s,id){
  const wk=getWeekKey();
  const st=JSON.parse(localStorage.getItem('statuses')||'{}');
  delete st[getAbKey(wk,p,d,t,s)]; delete st[getNcKey(wk,p,d,t,s)];
  localStorage.setItem('statuses',JSON.stringify(st));
  toggleCheck(wk,p,d,t,s);
  const done=isChecked(wk,p,d,t,s);
  refreshRow(p,d,t,s,id,done,false,false);
  updateSummary(p);
  pushProviderRecord(p,d,t,s,done?'seen':'pending');
}
function handleAbsent(p,d,t,s,id){
  const wk=getWeekKey(); toggleAbsent(wk,p,d,t,s);
  const ab=isAbsent(wk,p,d,t,s);
  refreshRow(p,d,t,s,id,isChecked(wk,p,d,t,s),ab,isNc(wk,p,d,t,s));
  updateSummary(p);
  pushProviderRecord(p,d,t,s,ab?'absent':'pending');
}
function handleNc(p,d,t,s,id){
  const wk=getWeekKey(); toggleNc(wk,p,d,t,s);
  const nc=isNc(wk,p,d,t,s);
  refreshRow(p,d,t,s,id,isChecked(wk,p,d,t,s),isAbsent(wk,p,d,t,s),nc);
  updateSummary(p);
  pushProviderRecord(p,d,t,s,nc?'nc':'pending');
}
function refreshRow(p,d,t,s,id,done,absent,nc){
  const row=document.getElementById('row_'+id);
  const btn=document.getElementById('btn_'+id);
  const ab=document.getElementById('ab_'+id);
  const ncb=document.getElementById('nc_'+id);
  const name=document.getElementById('name_'+id);
  const tag=row?row.querySelector('.status-tag'):null;
  if(row) row.className='session-row'+(absent?' absent-row':nc?' noncompliant-row':done?' checked':'');
  if(name){ name.style.textDecoration=done?'line-through':''; name.style.color=done?'#68d391':absent?'#c53030':nc?'#c05621':''; }
  if(btn){ btn.className='check-btn'+(done?' done':''); btn.innerHTML=done?'&#10003;':''; }
  if(ab) ab.className='absent-btn'+(absent?' active':'');
  if(ncb) ncb.className='nc-btn'+(nc?' active':'');
  if(tag){ if(absent){tag.className='status-tag absent';tag.textContent='Absent';}else if(nc){tag.className='status-tag nc';tag.textContent='Non-Compliant';}else{tag.className='status-tag';tag.textContent='';} }
}
function updateSummary(provider){
  const wk=getWeekKey(), pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
  let total=0,seen=0,absent=0;
  RAW.forEach(row=>{
    const s=(row[colIdx]||'').trim();if(!s||s==='x'||s.startsWith('Group'))return;
    total++;if(isChecked(wk,provider,row[0],row[1],s))seen++;if(isAbsent(wk,provider,row[0],row[1],s))absent++;
  });
  const t=document.getElementById('sumTotal'),sv=document.getElementById('sumSeen'),r=document.getElementById('sumRemain'),a=document.getElementById('sumAbsent');
  if(t)t.textContent=total;if(sv)sv.textContent=seen;if(r)r.textContent=total-seen-absent;if(a)a.textContent=absent;
}

/* --- SEND MODAL --- */
function getEmailList(){ try{return JSON.parse(localStorage.getItem('emailRecipients')||'[]');}catch(e){return[];} }
function saveEmailList(l){ localStorage.setItem('emailRecipients',JSON.stringify(l)); }
function renderEmailList(){
  const list=getEmailList(),el=document.getElementById('emailList');
  if(!list.length){el.innerHTML='<div style="font-size:0.82rem;color:#a0aec0;padding:6px 0;">No recipients yet.</div>';return;}
  el.innerHTML=list.map((em,i)=>'<div class="email-item"><span>'+em+'</span><button onclick="removeEmail('+i+')">&#10005;</button></div>').join('');
}
function addEmail(){
  const inp=document.getElementById('newEmailInput'),val=(inp.value||'').trim();
  if(!val||!val.includes('@')){inp.style.borderColor='#e53e3e';return;}
  inp.style.borderColor='';
  const list=getEmailList();if(!list.includes(val)){list.push(val);saveEmailList(list);}
  inp.value='';renderEmailList();
}
function removeEmail(idx){const list=getEmailList();list.splice(idx,1);saveEmailList(list);renderEmailList();}
function openSendModal(provider,day){
  sendModalDay={provider,day};
  document.getElementById('sendModalDay').textContent=provider+' \u2014 '+day;
  renderEmailList();
  document.getElementById('sendModal').classList.add('open');
}
function closeModal(){ document.getElementById('sendModal').classList.remove('open');sendModalDay=null; }
function doSendReport(){
  const list=getEmailList();if(!list.length){alert('Please add at least one email address.');return;}
  if(!sendModalDay)return;
  const {provider,day}=sendModalDay, wk=getWeekKey();
  const pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
  const lines=['RS Schedule \u2014 '+provider,'Day: '+day+' | Week of: '+getWeekRange(),''];
  const seen=[],absent=[],nc=[],remain=[];
  RAW.filter(r=>r[0]===day).forEach(row=>{
    const student=(row[colIdx]||'').trim();if(!student||student==='x'||student.startsWith('Group'))return;
    const t=timeStr(row[1]),subj=row[2];
    if(isChecked(wk,provider,day,row[1],student))seen.push(t+' '+student+' ('+subj+')');
    else if(isAbsent(wk,provider,day,row[1],student))absent.push(t+' '+student+' ('+subj+')');
    else if(isNc(wk,provider,day,row[1],student))nc.push(t+' '+student+' ('+subj+')');
    else remain.push(t+' '+student+' ('+subj+')');
  });
  if(seen.length)lines.push('SEEN ('+seen.length+'):','  '+seen.join('\n  '),'');
  if(absent.length)lines.push('ABSENT ('+absent.length+'):','  '+absent.join('\n  '),'');
  if(nc.length)lines.push('NON-COMPLIANT ('+nc.length+'):','  '+nc.join('\n  '),'');
  if(remain.length)lines.push('NOT YET SEEN ('+remain.length+'):','  '+remain.join('\n  '),'');
  const body=lines.join('\n'), subject='RS Schedule Report \u2014 '+provider+' \u2014 '+day;
  window.open('mailto:'+encodeURIComponent(list.join(','))+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body),'_blank');
  closeModal();
}

/* --- ADMIN VIEW --- */
let sbLoadStatus = null; // null=not tried, true=ok, false=failed
let adminAutoRefresh = null;
async function showAdminView(){
  document.getElementById('providerView').style.display='none';
  document.getElementById('adminView').style.display='block';
  document.getElementById('adminView').innerHTML='<div style="text-align:center;padding:60px 20px;color:#718096;font-size:1rem;">&#9203; Loading live data from Supabase...</div>';
  const cfg=getSupabaseCfg();
  if(cfg.url&&cfg.key){ sbLoadStatus = await fetchFromSupabase(); }
  renderAdminView();
  if(adminAutoRefresh) clearInterval(adminAutoRefresh);
  adminAutoRefresh = setInterval(async function(){
    if(currentUser==='admin'){
      const cfg2=getSupabaseCfg();
      if(cfg2.url&&cfg2.key){ sbLoadStatus = await fetchFromSupabase(getActiveWeekKey()); renderAdminTab(); updateSbStatusBadge(); }
    }
  }, 20000);
}
function updateSbStatusBadge(){
  const el = document.getElementById('sbStatusBadge');
  if(!el) return;
  const count = Object.keys(sbCache).length;
  if(sbLoadStatus===true) el.innerHTML='&#128994; Supabase: '+count+' record'+(count!==1?'s':'')+' loaded &nbsp;<button onclick="adminRefreshNow()" style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.4);color:white;border-radius:5px;padding:2px 10px;cursor:pointer;font-size:0.75rem;">&#8635; Refresh</button>';
  else if(sbLoadStatus===false) el.innerHTML='&#128308; Supabase: could not load &nbsp;<button onclick="adminRefreshNow()" style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.4);color:white;border-radius:5px;padding:2px 10px;cursor:pointer;font-size:0.75rem;">&#8635; Retry</button>';
  else el.innerHTML='&#9898; Supabase: checking...';
}
async function adminRefreshNow(){
  const el=document.getElementById('sbStatusBadge'); if(el) el.innerHTML='&#9203; Refreshing...';
  const cfg=getSupabaseCfg();
  if(cfg.url&&cfg.key){ sbLoadStatus = await fetchFromSupabase(getActiveWeekKey()); }
  renderAdminTab(); updateSbStatusBadge();
}
function renderAdminView(){
  const container = document.getElementById('adminView');
  const activeWk = getActiveWeekKey();
  const curWk = getWeekKey();
  const isCurrentWeek = (activeWk === curWk);
  const weekLabel = weekRangeFromKey(activeWk);

  // Calculate weeks back and prev/next keys cleanly
  function wkToDate(wk) {
    var p = wk.replace('week_','').split('_').map(Number);
    return new Date(p[0], p[1], p[2]);
  }
  var weeksBack = Math.round((wkToDate(curWk) - wkToDate(activeWk)) / 604800000);
  var prevKey = weekKeyOffset(weeksBack + 1);
  var nextKey = weekKeyOffset(weeksBack - 1);

  // Build HTML using DOM manipulation to avoid string escaping issues
  var html = '';
  html += '<div class="week-banner">';
  html += '<div><div class="week-label">' + (isCurrentWeek ? 'Current Week' : 'Past Week') + ' &mdash; ' + weekLabel + '</div>';
  html += '<div class="week-sub" id="sbStatusBadge">&#9898; Supabase: checking...</div></div>';
  if (isCurrentWeek) {
    html += '<div class="week-reset-badge">Next reset: ' + getNextSunday() + '</div>';
  } else {
    html += '<div class="week-reset-badge" style="background:#e9d8fd;color:#553c9a;">&#128337; ' + weeksBack + ' week' + (weeksBack !== 1 ? 's' : '') + ' ago</div>';
  }
  html += '</div>';

  // Week nav bar
  html += '<div class="week-nav no-print">';
  html += '<button class="week-nav-btn" id="btnPrevWeek">&#8592; Prev Week</button>';
  html += '<div class="week-nav-select-wrap"><select id="weekPickerSelect" style="width:100%;padding:8px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:0.88rem;font-weight:600;color:#2d4a6e;outline:none;cursor:pointer;"><option value="">Loading weeks...</option></select></div>';
  if (isCurrentWeek) {
    html += '<button class="week-nav-btn" style="opacity:0.35;cursor:default;" disabled>Next Week &#8594;</button>';
  } else {
    html += '<button class="week-nav-btn" id="btnNextWeek">Next Week &#8594;</button>';
  }
  html += '</div>';

  html += '<div class="print-bar no-print"><button class="btn-print" onclick="window.print()">Print / Share</button></div>';
  html += '<div class="admin-tabs">';
  html += '<button class="admin-tab' + (adminTab === 'overview' ? ' active' : '') + '" onclick="setAdminTab(&quot;overview&quot;)">Provider Overview</button>';
  html += '<button class="admin-tab' + (adminTab === 'student' ? ' active' : '') + '" onclick="setAdminTab(&quot;student&quot;)">Student Search</button>';
  html += '<button class="admin-tab' + (adminTab === 'sync' ? ' active' : '') + '" onclick="setAdminTab(&quot;sync&quot;)">Supabase Sync</button>';
  html += '</div><div id="adminTabContent"></div>';

  container.innerHTML = html;

  // Wire up buttons safely after DOM insertion
  var btnPrev = document.getElementById('btnPrevWeek');
  if (btnPrev) { btnPrev.addEventListener('click', function(){ navToWeek(prevKey); }); }
  var btnNext = document.getElementById('btnNextWeek');
  if (btnNext) { btnNext.addEventListener('click', function(){ navToWeek(nextKey); }); }
  var sel = document.getElementById('weekPickerSelect');
  if (sel) { sel.addEventListener('change', function(){ navToWeek(this.value); }); }

  renderAdminTab();
  populateWeekPicker(activeWk);
  updateSbStatusBadge();
}

async function populateWeekPicker(activeWk){
  const sel=document.getElementById('weekPickerSelect');
  if(!sel) return;
  const weeks=await fetchAvailableWeeks();
  const currentWk=getWeekKey();
  // Always include current week even if no data yet
  if(!weeks.includes(currentWk)) weeks.unshift(currentWk);
  sel.innerHTML=weeks.map(wk=>{
    const label=wk===getWeekKey()?'Current Week ('+weekRangeFromKey(wk)+')':weekRangeFromKey(wk);
    return '<option value="'+wk+'"'+(wk===activeWk?' selected':'')+'>'+label+'</option>';
  }).join('');
}

async function navToWeek(wk){
  viewingWeekKey = (wk===getWeekKey()) ? null : wk;
  document.getElementById('adminView').innerHTML='<div style="text-align:center;padding:60px 20px;color:#718096;font-size:1rem;">&#9203; Loading week data...</div>';
  const cfg=getSupabaseCfg();
  if(cfg.url&&cfg.key){ await fetchFromSupabase(wk); }
  renderAdminView();
}
function setAdminTab(tab){ adminTab=tab; renderAdminView(); }
function renderAdminTab(){
  const wk=getActiveWeekKey(), el=document.getElementById('adminTabContent');
  const useSb=Object.keys(sbCache).length>0;
  if(adminTab==='overview'){
    let html='';
    PROVIDERS.forEach((prov,pIdx)=>{
      const colIdx=pIdx+3; let total=0,checked=0,absent=0,nc=0; const sessions=[];
      RAW.forEach(row=>{
        const student=(row[colIdx]||'').trim();if(!student||student==='x'||student.startsWith('Group'))return;
        const done=useSb?sbDone(prov,row[0],row[1],student):isChecked(wk,prov,row[0],row[1],student);
        const ab=useSb?sbAbsent(prov,row[0],row[1],student):isAbsent(wk,prov,row[0],row[1],student);
        const nco=useSb?sbNc(prov,row[0],row[1],student):isNc(wk,prov,row[0],row[1],student);
        sessions.push({day:row[0],time:row[1],subject:row[2],student,done,absent:ab,nc:nco});
        total++;if(done)checked++;if(ab)absent++;if(nco)nc++;
      });
      const pct=total>0?Math.round(checked/total*100):0;
      const tc=getTypeClass(prov),pid='prov_'+pIdx,shortName=prov.split(' - ')[1]||'CO',firstName=prov.split(' - ')[0];
      html+='<div class="provider-card"><div class="provider-card-header" onclick="toggleProvCard(\''+pid+'\')">'
        +'<h3><span class="badge '+tc+'">'+shortName+'</span> &nbsp;'+firstName+'</h3>'
        +'<div style="display:flex;align-items:center;gap:8px;">'
        +(absent>0?'<span style="font-size:0.73rem;color:#c53030;">Absent: '+absent+'</span>':'')
        +(nc>0?'<span style="font-size:0.73rem;color:#c05621;">NC: '+nc+'</span>':'')
        +'<div class="progress-bar-wrap"><div class="progress-bar"><div class="progress-fill" style="width:'+pct+'%"></div></div>'
        +'<div class="progress-label">'+checked+'/'+total+' ('+pct+'%)</div></div>'
        +'</div></div>'
        +'<div class="provider-sessions" id="'+pid+'">';
      DAYS_ORDER.forEach(day=>{
        const ds=sessions.filter(s=>s.day===day);if(!ds.length)return;
        html+='<div style="font-weight:700;color:#2d4a6e;margin:10px 0 4px;font-size:0.84rem;">'+day+'</div>';
        ds.forEach(s=>{
          const icon=s.absent?'Absent':s.nc?'NC':s.done?'Seen':'--';
          const cls=s.done?'checked-text':s.absent?'':'unchecked-text';
          html+='<div class="admin-session-row">'
            +'<div class="check-icon">'+(s.done?'&#9989;':s.absent?'&#128683;':s.nc?'&#9888;':'&#11036;')+'</div>'
            +'<div style="width:78px;font-size:0.76rem;color:#4a5568;">'+timeStr(s.time)+'</div>'
            +'<div class="'+cls+'" style="flex:1;">'+s.student+(s.absent?' <span style="font-size:0.7rem;color:#c53030;">(Absent)</span>':s.nc?' <span style="font-size:0.7rem;color:#c05621;">(NC)</span>':'')+'</div>'
            +'<div style="font-size:0.72rem;color:#718096;">'+s.subject+'</div>'
            +'</div>';
        });
      });
      html+='</div></div>';
    });
    el.innerHTML=html;
  } else if(adminTab==='student'){
    el.innerHTML='<div class="search-wrap"><span class="si">&#128269;</span>'
      +'<input type="text" id="adminStudentSearch" placeholder="Search student name..." oninput="adminSearch()"></div>'
      +'<div id="adminSearchResults"><div class="no-data">Type a name to search.</div></div>';
  } else if(adminTab==='sync'){
    const cfg=getSupabaseCfg();
    el.innerHTML='<div class="config-panel"><h3>Supabase Sync</h3>'
      +'<p>Connect to Supabase to sync all data across devices in real time.</p>'
      +'<div class="config-row"><label>Project URL</label><input type="text" id="sbUrl" placeholder="https://xxxxx.supabase.co" value="'+(cfg.url||'')+'"></div>'
      +'<div class="config-row"><label>Anon Key</label><input type="text" id="sbKey" placeholder="eyJ..." value="'+(cfg.key||'')+'"></div>'
      +'<div class="config-row"><label>Table</label><input type="text" id="sbTable" placeholder="checkoffs" value="'+(cfg.table||'checkoffs')+'"></div>'
      +'<button class="btn-sync" onclick="saveSupabaseCfg()">Save Config</button>'
      +'<button class="btn-sync" style="background:linear-gradient(135deg,#2b6cb0,#3182ce);" onclick="doSupabaseSync()">Push to Supabase</button>'
      +'<button class="btn-sync" style="background:linear-gradient(135deg,#276749,#38a169);margin-top:6px;" onclick="refreshAdminData()">Refresh Admin View</button>'
      +'<button class="btn-sync" style="background:linear-gradient(135deg,#744210,#c05621);margin-top:6px;" onclick="diagnoseSb()">&#128270; Diagnose Connection</button>'
      +'<div class="sync-status" id="syncStatus"></div>'
      +'<pre id="diagOut" style="background:#1a2332;color:#a8f0c0;padding:12px;border-radius:8px;font-size:0.75rem;margin-top:10px;white-space:pre-wrap;word-break:break-all;display:none;"></pre>'
      +'</div>'
      +'<div class="config-panel"><h3>Setup Instructions</h3>'
      +'<p>1. Create a free project at <strong>supabase.com</strong><br>'
      +'2. Create table <strong>checkoffs</strong> with columns:<br>'
      +'&nbsp;&nbsp;<code>week_key</code> (text), <code>provider</code> (text), <code>day</code> (text),<br>'
      +'&nbsp;&nbsp;<code>time</code> (float8), <code>student</code> (text), <code>status</code> (text),<br>'
      +'&nbsp;&nbsp;<code>updated_at</code> (timestamptz)<br>'
      +'3. Enable Row Level Security with anon read/write policy<br>'
      +'4. Paste Project URL + anon key above and click Save Config<br>'
      +'5. Click Sync Now to push local data</p></div>';
  }
}
function toggleProvCard(id){ const el=document.getElementById(id);if(el)el.classList.toggle('open'); }
function adminSearch(){
  const query=(document.getElementById('adminStudentSearch').value||'').trim().toLowerCase();
  const results=document.getElementById('adminSearchResults'),wk=getWeekKey();
  if(query.length<2){results.innerHTML='<div class="no-data">Type at least 2 characters.</div>';return;}
  const useSb=Object.keys(sbCache).length>0;
  const found=[];
  RAW.forEach(row=>{
    for(let c=3;c<3+PROVIDERS.length;c++){
      const student=(row[c]||'').trim();
      if(student&&student!=='x'&&!student.startsWith('Group')&&student.toLowerCase().includes(query)){
        const prov=PROVIDERS[c-3];
        found.push({day:row[0],time:row[1],subject:row[2],student,provider:prov,
          done:useSb?sbDone(prov,row[0],row[1],student):isChecked(wk,prov,row[0],row[1],student),
          absent:useSb?sbAbsent(prov,row[0],row[1],student):isAbsent(wk,prov,row[0],row[1],student),
          nc:useSb?sbNc(prov,row[0],row[1],student):isNc(wk,prov,row[0],row[1],student)});
      }
    }
  });
  if(!found.length){results.innerHTML='<div class="no-data">No students found.</div>';return;}
  const byStudent={};found.forEach(f=>{if(!byStudent[f.student])byStudent[f.student]=[];byStudent[f.student].push(f);});
  let html='';
  Object.keys(byStudent).forEach(name=>{
    const sessions=byStudent[name],seenCount=sessions.filter(s=>s.done).length,abCount=sessions.filter(s=>s.absent).length;
    html+='<div class="provider-card"><div style="padding:12px 18px;font-weight:700;font-size:1rem;color:#1a2332;display:flex;justify-content:space-between;align-items:center;">'
      +'<span>'+name+'</span><span style="font-size:0.76rem;color:#718096;">'+seenCount+'/'+sessions.length+' seen'+(abCount?' \u00b7 Absent:'+abCount:'')+'</span></div>'
      +'<div style="padding:0 18px 14px;">';
    sessions.forEach(s=>{
      const tc=getTypeClass(s.provider),tl=s.provider.includes('SLP')?'SLP':s.provider.includes('OT')?'OT':'CO';
      html+='<div class="admin-session-row">'
        +'<div class="check-icon">'+(s.done?'&#9989;':s.absent?'&#128683;':s.nc?'&#9888;':'&#11036;')+'</div>'
        +'<div style="width:70px;font-size:0.75rem;color:#4a5568;">'+s.day+'</div>'
        +'<div style="width:70px;font-size:0.75rem;color:#4a5568;">'+timeStr(s.time)+'</div>'
        +'<div style="flex:1;font-size:0.82rem;" class="'+(s.done?'checked-text':s.absent?'':'unchecked-text')+'">'+s.provider+'</div>'
        +'<span class="badge '+tc+'">'+tl+'</span></div>';
    });
    html+='</div></div>';
  });
  results.innerHTML=html;
}

/* --- SUPABASE --- */
let sbCache = {}; // { "provider||day||time||student": "seen|absent|nc|pending" }

// ── HARDCODED SUPABASE CONFIG (fallback if not set via UI) ──────────────
// To update: log in as Admin → Supabase Sync tab → paste new values → Save Config
const SUPABASE_DEFAULT = { url: 'https://kvthwpsfseacviwvywjj.supabase.co', key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dGh3cHNmc2VhY3Zpd3Z5d2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMTQ0NTgsImV4cCI6MjA5OTc5MDQ1OH0.BdRlqal98cigWaLt05tR6CN0yfG1FNIfNVjMdW8BYp8', table: 'checkoffs' };
// ────────────────────────────────────────────────────────────────────────
function getSupabaseCfg(){
  try{
    const saved = JSON.parse(localStorage.getItem('supabaseCfg')||'{}');
    // Merge: saved values override defaults
    return {
      url: saved.url || SUPABASE_DEFAULT.url,
      key: saved.key || SUPABASE_DEFAULT.key,
      table: saved.table || SUPABASE_DEFAULT.table
    };
  }catch(e){ return SUPABASE_DEFAULT; }
}
function saveSupabaseCfg(){
  const cfg={url:(document.getElementById('sbUrl').value||'').trim().replace(/\/$/,''),key:(document.getElementById('sbKey').value||'').trim(),table:(document.getElementById('sbTable').value||'checkoffs').trim()};
  localStorage.setItem('supabaseCfg',JSON.stringify(cfg));showSyncStatus('Config saved!',true);
}
function showSyncStatus(msg,ok){ const el=document.getElementById('syncStatus');if(!el)return;el.textContent=msg;el.className='sync-status '+(ok?'ok':'err'); }

// Pull all records for a given week from Supabase into sbCache
async function fetchFromSupabase(weekKey){
  const cfg=getSupabaseCfg();
  if(!cfg.url||!cfg.key) return false;
  const wk = weekKey || getWeekKey();
  try{
    const res=await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?week_key=eq.'+encodeURIComponent(wk)+'&limit=10000',{
      headers:{'apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Accept':'application/json'}
    });
    if(!res.ok) return false;
    const data=await res.json();
    sbCache={};
    data.forEach(r=>{ sbCache[r.provider+'||'+r.day+'||'+parseFloat(r.time).toFixed(10)+'||'+r.student]=r.status; });
    return true;
  }catch(e){ return false; }
}

// Fetch list of all distinct week_keys from Supabase
async function fetchAvailableWeeks(){
  const cfg=getSupabaseCfg();
  if(!cfg.url||!cfg.key) return [];
  try{
    const res=await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?select=week_key&limit=10000',{
      headers:{'apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Accept':'application/json'}
    });
    if(!res.ok) return [];
    const data=await res.json();
    const weeks=[...new Set(data.map(r=>r.week_key))];
    // Sort descending (most recent first)
    weeks.sort((a,b)=>{
      const pa=a.replace('week_','').split('_').map(Number);
      const pb=b.replace('week_','').split('_').map(Number);
      const da=new Date(pa[0],pa[1],pa[2]);
      const db=new Date(pb[0],pb[1],pb[2]);
      return db-da;
    });
    return weeks;
  }catch(e){ return []; }
}

// Status helpers using sbCache (for admin view)
function sbDone(p,d,t,s){ return sbCache[p+'||'+d+'||'+parseFloat(t).toFixed(10)+'||'+s]==='seen'; }
function sbAbsent(p,d,t,s){ return sbCache[p+'||'+d+'||'+parseFloat(t).toFixed(10)+'||'+s]==='absent'; }
function sbNc(p,d,t,s){ return sbCache[p+'||'+d+'||'+parseFloat(t).toFixed(10)+'||'+s]==='nc'; }

async function pushProviderRecord(provider, day, time, student, status){
  const cfg=getSupabaseCfg(); if(!cfg.url||!cfg.key) return;
  const wk=getWeekKey();
  const row={week_key:wk,provider,day,time,student,status,updated_at:new Date().toISOString()};
  try{
    await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?on_conflict=week_key,provider,day,time,student',{
      method:'POST',headers:{'Content-Type':'application/json','apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Prefer':'resolution=merge-duplicates'},
      body:JSON.stringify([row])
    });
  }catch(e){}
}

async function doSupabaseSync(){
  const cfg=getSupabaseCfg();if(!cfg.url||!cfg.key){showSyncStatus('Please save your Supabase URL and key first.',false);return;}
  showSyncStatus('Syncing...', true);
  const wk=getWeekKey(); const rows=[];
  PROVIDERS.forEach((prov,pIdx)=>{
    const colIdx=pIdx+3;
    RAW.forEach(row=>{
      const student=(row[colIdx]||'').trim();if(!student||student==='x'||student.startsWith('Group'))return;
      const done=isChecked(wk,prov,row[0],row[1],student),ab=isAbsent(wk,prov,row[0],row[1],student),nc=isNc(wk,prov,row[0],row[1],student);
      rows.push({week_key:wk,provider:prov,day:row[0],time:row[1],student,status:done?'seen':ab?'absent':nc?'nc':'pending',updated_at:new Date().toISOString()});
    });
  });
  try{
    const res=await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?on_conflict=week_key,provider,day,time,student',{
      method:'POST',headers:{'Content-Type':'application/json','apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Prefer':'resolution=merge-duplicates'},
      body:JSON.stringify(rows)
    });
    if(res.ok) showSyncStatus('Synced '+rows.length+' records to Supabase!',true);
    else{ const err=await res.text();showSyncStatus('Sync failed: '+err.substring(0,120),false); }
  }catch(e){showSyncStatus('Network error: '+e.message,false);}
}

async function refreshAdminData(){
  const el=document.getElementById('syncStatus');
  if(el){el.textContent='Fetching latest data...';el.className='sync-status ok';}
  const ok=await fetchFromSupabase(getActiveWeekKey());
  if(ok){
    if(el){el.textContent='Admin view updated with latest Supabase data!';el.className='sync-status ok';}
    adminTab='overview';
    renderAdminView();
  } else {
    if(el){el.textContent='Could not fetch from Supabase. Check your config.';el.className='sync-status err';}
  }
}

async function diagnoseSb(){
  const out = document.getElementById('diagOut');
  if(!out) return;
  out.style.display='block';
  out.textContent = 'Running diagnostics...\n';
  const cfg = getSupabaseCfg();
  const wk = getWeekKey();
  out.textContent += 'Week key: ' + wk + '\n';
  out.textContent += 'Supabase URL: ' + (cfg.url || 'NOT SET') + '\n';
  out.textContent += 'Anon key set: ' + (cfg.key ? 'YES (' + cfg.key.substring(0,20) + '...)' : 'NO') + '\n';
  out.textContent += 'Table: ' + (cfg.table||'checkoffs') + '\n\n';

  if(!cfg.url || !cfg.key){ out.textContent += 'ERROR: No Supabase config. Cannot connect.\n'; return; }

  // Test 1: fetch all rows (no week filter) to see if ANY data exists
  try{
    out.textContent += 'Test 1: Fetching ALL rows from table (no filter)...\n';
    const r1 = await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?limit=5', {
      headers:{'apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Accept':'application/json'}
    });
    out.textContent += 'HTTP status: ' + r1.status + ' ' + r1.statusText + '\n';
    if(r1.ok){
      const d1 = await r1.json();
      out.textContent += 'Rows returned (up to 5): ' + d1.length + '\n';
      if(d1.length > 0){
        out.textContent += 'Sample row: ' + JSON.stringify(d1[0]) + '\n';
        out.textContent += 'Sample week_key in DB: "' + d1[0].week_key + '"\n';
        out.textContent += 'Current week_key:      "' + wk + '"\n';
        out.textContent += 'Keys match: ' + (d1[0].week_key === wk ? 'YES' : 'NO — MISMATCH!') + '\n';
      } else {
        out.textContent += 'Table is EMPTY — providers have not pushed any data yet.\n';
      }
    } else {
      const err = await r1.text();
      out.textContent += 'ERROR response: ' + err + '\n';
    }
  }catch(e){ out.textContent += 'Network error: ' + e.message + '\n'; }

  // Test 2: fetch with current week filter
  try{
    out.textContent += '\nTest 2: Fetching rows for current week...\n';
    const r2 = await fetch(cfg.url+'/rest/v1/'+(cfg.table||'checkoffs')+'?week_key=eq.'+encodeURIComponent(wk)+'&limit=5', {
      headers:{'apikey':cfg.key,'Authorization':'Bearer '+cfg.key,'Accept':'application/json'}
    });
    if(r2.ok){
      const d2 = await r2.json();
      out.textContent += 'Rows for this week: ' + d2.length + '\n';
      if(d2.length > 0) out.textContent += 'Sample: ' + JSON.stringify(d2[0]) + '\n';
    }
  }catch(e){ out.textContent += 'Error: ' + e.message + '\n'; }

  out.textContent += '\nsbCache size after last fetch: ' + Object.keys(sbCache).length + ' entries\n';
  if(Object.keys(sbCache).length > 0){
    // Show status distribution
    const counts = {};
    Object.values(sbCache).forEach(v=>{ counts[v]=(counts[v]||0)+1; });
    out.textContent += 'Status breakdown: ' + JSON.stringify(counts) + '\n';
    // Show first 3 cache keys
    const keys = Object.keys(sbCache).slice(0,3);
    keys.forEach(k => { out.textContent += 'Cache key: "' + k + '" → ' + sbCache[k] + '\n'; });
    // Show what the lookup would generate for first 3 keys
    out.textContent += '\nLookup test (first 3 RAW rows that have a student for provider 0):\n';
    const prov0 = PROVIDERS[0]; const col0 = 3;
    let tested = 0;
    for(let i=0; i<RAW.length && tested<3; i++){
      const st = (RAW[i][col0]||'').trim();
      if(!st || st==='x' || st.startsWith('Group')) continue;
      const lookupKey = prov0+'||'+RAW[i][0]+'||'+parseFloat(RAW[i][1]).toFixed(10)+'||'+st;
      out.textContent += 'Lookup: "' + lookupKey + '" → ' + (sbCache[lookupKey]||'NOT FOUND') + '\n';
      tested++;
    }
  }
  out.textContent += '\nDiagnostics complete.';
}

/* --- OFFICE VIEW --- */

function showOfficeView(){
  document.getElementById('providerView').style.display='none';
  document.getElementById('adminView').style.display='none';
  document.getElementById('officeView').style.display='block';
  renderOfficeView();
}

function renderOfficeView(){
  const container = document.getElementById('officeView');
  var html = '<div class="week-banner"><div><div class="week-label">Office View &mdash; Student Reports</div>';
  html += '<div class="week-sub">Search any student and download their schedule report</div></div>';
  html += '<div class="week-reset-badge">Week of ' + getWeekRange() + '</div></div>';
  html += '<div class="office-search-bar">';
  html += '<input type="text" id="officeSearchInput" placeholder="&#128269; Type student name to search..." oninput="officeSearch()" autocomplete="off">';
  html += '<button class="btn-download" id="btnDownloadDocx" onclick="downloadStudentReport()" disabled>&#128196; Download Word</button>';
  html += '</div>';
  html += '<div id="officeResults"><div class="no-data">Start typing a student name above.</div></div>';
  container.innerHTML = html;
}

var officeCurrentStudent = null;

function officeSearch(){
  var query = (document.getElementById('officeSearchInput').value || '').trim().toLowerCase();
  var results = document.getElementById('officeResults');
  var btnDoc = document.getElementById('btnDownloadDocx');
  officeCurrentStudent = null;
  if(btnDoc) btnDoc.disabled = true;

  if(query.length < 2){
    results.innerHTML = '<div class="no-data">Type at least 2 characters.</div>';
    return;
  }

  var wk = getWeekKey();
  var useSb = Object.keys(sbCache).length > 0;

  // Find all matching students
  var studentMap = {};
  RAW.forEach(function(row){
    for(var c = 3; c < 3 + PROVIDERS.length; c++){
      var student = (row[c] || '').trim();
      if(student && student !== 'x' && !student.startsWith('Group') && student.toLowerCase().includes(query)){
        if(!studentMap[student]) studentMap[student] = [];
        var prov = PROVIDERS[c-3];
        var done = useSb ? sbDone(prov,row[0],row[1],student) : isChecked(wk,prov,row[0],row[1],student);
        var absent = useSb ? sbAbsent(prov,row[0],row[1],student) : isAbsent(wk,prov,row[0],row[1],student);
        var nc = useSb ? sbNc(prov,row[0],row[1],student) : isNc(wk,prov,row[0],row[1],student);
        studentMap[student].push({
          provider: prov, day: row[0], time: row[1], subject: row[2],
          done: done, absent: absent, nc: nc
        });
      }
    }
  });

  var names = Object.keys(studentMap);
  if(!names.length){
    results.innerHTML = '<div class="no-data">No students found.</div>';
    return;
  }

  var html = '';
  names.forEach(function(name){
    var sessions = studentMap[name];
    var seenCount = sessions.filter(function(s){return s.done;}).length;
    var abCount = sessions.filter(function(s){return s.absent;}).length;
    var ncCount = sessions.filter(function(s){return s.nc;}).length;

    html += '<div class="student-report-card" data-sname="' + name.replace(/"/g,'&quot;') + '" onclick="selectStudent(this.dataset.sname)" style="cursor:pointer;">';
    html += '<div class="student-report-header">';
    html += '<h2>' + name + '</h2>';
    html += '<span>' + sessions.length + ' sessions &nbsp;|&nbsp; &#9989; ' + seenCount + ' seen';
    if(abCount) html += ' &nbsp;|&nbsp; &#128683; ' + abCount + ' absent';
    if(ncCount) html += ' &nbsp;|&nbsp; &#9888; ' + ncCount + ' NC';
    html += '</span></div>';

    // Group by provider
    var byProv = {};
    sessions.forEach(function(s){
      if(!byProv[s.provider]) byProv[s.provider] = [];
      byProv[s.provider].push(s);
    });

    Object.keys(byProv).forEach(function(prov){
      var tc = getTypeClass(prov);
      var tl = prov.includes('SLP')?'SLP':prov.includes('OT')?'OT':'CO';
      html += '<div class="report-provider-block">';
      html += '<div class="report-provider-name"><span class="badge ' + tc + '">' + tl + '</span>' + prov + '</div>';
      byProv[prov].forEach(function(s){
        html += '<div class="report-session-row">';
        html += '<div class="report-day">' + s.day + '</div>';
        html += '<div class="report-time">' + timeStr(s.time) + '</div>';
        html += '<div style="flex:1;color:#2d3748;">' + s.subject + '</div>';
        html += '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
  });

  results.innerHTML = html;

  // Auto-select if only one result
  if(names.length === 1){
    selectStudent(names[0]);
  }
}

function selectStudent(name){
  officeCurrentStudent = name;
  // Highlight selected card
  var cards = document.querySelectorAll('.student-report-card');
  cards.forEach(function(c){
    c.style.boxShadow = c.querySelector('h2') && c.querySelector('h2').textContent === name
      ? '0 0 0 3px #2d4a6e' : '';
  });
  var btn = document.getElementById('btnDownloadDocx');
  if(btn){ btn.disabled = false; }
}

function downloadStudentReport(){
  if(!officeCurrentStudent) return;
  var name = officeCurrentStudent;
  var wk = getWeekKey();
  var useSb = Object.keys(sbCache).length > 0;

  // Gather all sessions for this student
  var sessions = [];
  RAW.forEach(function(row){
    for(var c = 3; c < 3 + PROVIDERS.length; c++){
      var student = (row[c] || '').trim();
      if(student === name){
        var prov = PROVIDERS[c-3];
        var done = useSb ? sbDone(prov,row[0],row[1],student) : isChecked(wk,prov,row[0],row[1],student);
        var absent = useSb ? sbAbsent(prov,row[0],row[1],student) : isAbsent(wk,prov,row[0],row[1],student);
        var nc = useSb ? sbNc(prov,row[0],row[1],student) : isNc(wk,prov,row[0],row[1],student);
        sessions.push({provider:prov, day:row[0], time:row[1], subject:row[2], done:done, absent:absent, nc:nc});
        break;
      }
    }
  });

  // Build Word-compatible HTML document with letterhead image
  var today = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  var rows = '';
  sessions.forEach(function(s){
    var bg = rows.split('<tr').length % 2 === 0 ? '#f7fafc' : 'white';
    rows += '<tr style="background:' + bg + ';">';
    rows += '<td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;">' + s.day + '</td>';
    rows += '<td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;">' + timeStr(s.time) + '</td>';
    rows += '<td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;">' + s.provider + '</td>';
    rows += '</tr>';
  });

  var htmlContent = '<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="UTF-8">';
  htmlContent += '<style>';
  htmlContent += 'body{font-family:Arial,sans-serif;margin:0;padding:0;}';
  htmlContent += 'h1{color:#1a2332;font-size:22pt;margin:0 0 6px 0;}';
  htmlContent += '.student-name{font-size:26pt;font-weight:700;color:#2d4a6e;margin:0 0 4px 0;}';
  htmlContent += '.meta{color:#718096;font-size:9pt;margin-bottom:0;}';
  htmlContent += '.content{padding:40px 40px 40px 30px;}';
  htmlContent += 'table{width:100%;border-collapse:collapse;font-size:10pt;margin-top:24px;}';
  htmlContent += 'thead tr{background:#1a2332;color:white;}';
  htmlContent += 'thead th{padding:10px 14px;text-align:left;font-weight:600;}';
  htmlContent += 'tbody tr:nth-child(even){background:#f7fafc;}';
  htmlContent += 'tbody td{padding:9px 14px;border-bottom:1px solid #e2e8f0;}';
  htmlContent += '</style></head><body>';
  // Full-page layout: letterhead left strip, content right
  htmlContent += '<table style="width:100%;border-collapse:collapse;min-height:1100px;">';
  htmlContent += '<tr>';
  htmlContent += '<td style="width:160px;vertical-align:top;padding:0;background:#fff;">';
  htmlContent += '<img src="data:image/jpeg;base64,' + LETTERHEAD_B64 + '" style="display:block;width:160px;height:auto;" />';
  htmlContent += '</td>';
  htmlContent += '<td style="vertical-align:top;padding:0;">';
  htmlContent += '<div class="content">';
  htmlContent += '<h1>Student Schedule Report</h1>';
  htmlContent += '<div class="student-name">' + name + '</div>';
  htmlContent += '<div class="meta">Generated: ' + today + '</div>';
  htmlContent += '<table><thead><tr><th>Day</th><th>Time</th><th>Provider</th></tr></thead>';
  htmlContent += '<tbody>' + rows + '</tbody></table>';
  htmlContent += '</div>';
  htmlContent += '</td>';
  htmlContent += '</tr></table>';
  htmlContent += '</body></html>';

  // Download as .html (opens perfectly in Word & prints as PDF)
  var blob = new Blob([htmlContent], {type:'application/msword'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/[^a-zA-Z0-9]/g,'_') + '_Schedule_Report.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* --- INSTALL BANNER --- */
let deferredPrompt=null;
function hideBanner(){ const b=document.getElementById('installBanner');if(b)b.classList.remove('visible');localStorage.setItem('installDismissed','1'); }
window.addEventListener('beforeinstallprompt',function(e){ e.preventDefault();deferredPrompt=e; if(!localStorage.getItem('installDismissed'))setTimeout(()=>{const b=document.getElementById('installBanner');if(b)b.classList.add('visible');},2000); });
function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream; }
function isInStandaloneMode(){ return window.navigator.standalone===true; }
if(isIOS()&&!isInStandaloneMode()&&!localStorage.getItem('installDismissed')){
  setTimeout(()=>{const b=document.getElementById('installBanner');if(b)b.classList.add('visible');},2000);
  const ib=document.getElementById('installBtn');if(ib){ib.textContent='How to Install';ib.onclick=()=>alert('To install:\n\n1. Tap the Share button at the bottom of Safari\n2. Tap Add to Home Screen\n3. Tap Add');}
}
window.addEventListener('appinstalled',hideBanner);

checkRemembered();
