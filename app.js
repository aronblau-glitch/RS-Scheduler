
const PASSWORDS = {
  'admin': 'admin123',
  'office': 'offi1',
  'Goldberger - SLP': 'gold1',
  'Friedman - SLP':   'frie1',
  'Ziegler - SLP':    'zieg1',
  'Horowitz - SLP':   'horo1',
  'Herbst - SLP':     'herb1',
  'Schachter - PT':   'scha1',
  'Malks - OT':       'malk1',
  'Dyckman - OT':     'dyck1',
  'Fischer - CO':     'fisc1',
  'Kerenkraut - CO':  'kere1',
  'Werner - CO':      'wern1',
  'Weber - CO':       'webe1',
  'Fayersteyn - CO':  'faye1',
};
const PROVIDERS = [
  'Goldberger - SLP','Friedman - SLP','Ziegler - SLP','Horowitz - SLP','Herbst - SLP','Schachter - PT','Malks - OT','Dyckman - OT','Fischer - CO','Kerenkraut - CO','Werner - CO','Weber - CO','Fayersteyn - CO'
];
const DAYS_ORDER = ['Monday','Tuesday','Wednesday','Thursday'];
const RAW = [
  ["Monday",0.3854166667,"Breakfast","Markowitz Cheskel / Rosinger Mordechai","Braver, Naftuli Hersk / Freund Eli","","","","","","","Prero, Shloimy","","",""],
  ["Monday",0.40625,"Breakfast","Toub Zisman / Walk Simcha Bimin","Brull Yeshoshua","Reich Avraham Shimon","Goldhirsch Avrohom Simcha","Bergman Moishe / Reinhold, Baruch","","","","Braver, Naftuli Hersk","","","Lichtenstein Abraham"],
  ["Monday",0.4270833333,"1st session","","","","","","","","","","","",""],
  ["Monday",0.4479166667,"2nd Session","","","","","","","","","","","",""],
  ["Monday",0.46875,"2nd Session","Briskman Isaac / Schwartz Yehudah","Prero, Shloimy","Abramowitz Nechemia","Brown Meir","Twersky Shia / Weberman Elimelach","","","","Rothstein Mendy","","","Bergman Moishe"],
  ["Monday",0.4895833333,"2nd Session","Kaufman Yisroel Meir","Kuperman Favi","Pollack Hershy","Gottlieb Shulem","Kraminar Leiby / Heimfeld Avrohom","","","","Blum Nechemiah","","","Epstein Isaac"],
  ["Monday",0.5104166667,"3rd Session","Rothstein Mendy","Kaufman, Shimmy","Horowitz Chaim","Sofer Yiddi","Schwartz Shimon","","","","Goldhirsch Avrohom Simcha","Freund Eli","","Fisch, Moshe"],
  ["Monday",0.53125,"Lunch","Lichtenstein Abraham","Weinberger Rafael","Briskman David","Fisch, Moshe","Blum Nechemiah","","","","Schwartz Shimon","Schwartz Moshe","","Reich Avraham Shimon"],
  ["Monday",0.5520833333,"Lunch","Silberman Moishe","Schwartz Moshe","Hershkowitz Yanky","Stern Shulem","Weiss Shimon","Group Therapy","","","Group Therapy","Markowitz Cheskel","Kaufman Yisroel Meir","Group Therapy"],
  ["Monday",0.5729166667,"English","Wigder Matis","Fisher Zev","Weissman Yosef","Flam Pinchas","Epstein Isaac","Brull Yeshoshua / Blum Nechemiah","","Kaufman, Shimmy","Schlesinger Avraham","Weiss Shimon","Silberman Moishe","Abramowitz Nechemia"],
  ["Monday",0.59375,"English","Gestetner Abraham","Gross Israel","Wosner Menachem","Oberlander Eli","Gestetner Efraim","Schwartz Shimon / Freund Eli","","Horowitz Chaim","Weberman Elimelach","Spitz Moishe","Fogel Efraim","Feigenbaum Shalom"],
  ["Monday",0.6145833333,"Math","Landau Berl","Stein, Levi Yitzchok","Weiss Aron","Levine, Reuven","Spitz Moishe","Schwartz Moshe / Markowitz Cheskel","","Prero, Shloimy","Flam Pinchas","Brown Meir","Rosinger Mordechai","Pollak Shmuel (2)"],
  ["Monday",0.6354166667,"Science","Gluck Aron","Fogel Efraim","Schwartz Joel","Teichman Yidel","Schlesinger Avraham","Weiss Shimon / Spitz Moishe","","Braver, Naftuli Hersk","Huss Eliyahu Dov","Gottlieb Shulem","Reinhold, Baruch","Gestetner Shloime"],
  ["Monday","3:46 - 4:30PM","Event","x","","","x","x","","","x","x","","",""],
  ["Monday",0.6875,"social skill group","x","Huss Eliyahu Dov","x","Brauner Benzion","Lowenbraun, Eli","Brown Meir / Gottlieb Shulem","","Brull Yeshoshua","Kanner Yehudah","Sofer Yiddi","Pollack Hershy","Gross Israel"],
  ["Monday",0.7083333333,"social skill group","","Schnitzler, Mordechai","x","Abramowits Shimon","Kish, Yitzchok","Bergman Moishe / Epstein Isaac","","Rothstein Mendy","Gestetner Abraham","Fisher Zev","Weiss Aron","Salamon Shraga"],
  ["Monday",0.7291666667,"social skill group","","Gestetner Shloime","x","Babad Joseph","Goldberger Eliyahu","Fisch, Moshe / Reich Avraham Shimon","","Blum Nechemiah","Landau Berl","Heimfeld Avrohom","Reichberg Yizchok","Schmeltzer Menashe"],
  ["Tuesday",0.3854166667,"Breakfast","","","","","","","","Horowitz Chaim","Rothstein Mendy","","",""],
  ["Tuesday",0.40625,"Breakfast","","","","Brown Meir","","Blum Nechemiah / Schwartz Shimon","Weinberger Rafael","Freund Eli","Prero, Shloimy","","Pollack Hershy",""],
  ["Tuesday",0.4270833333,"1st session","","","","","","","","","","","",""],
  ["Tuesday",0.4479166667,"2nd Session","","","","","","","","","","","",""],
  ["Tuesday",0.46875,"2nd Session","","","","Sofer Yiddi","","Freund Eli / Schwartz Moshe","Levine, Reuven","x","Braver, Naftuli Hersk","","Reinhold, Baruch",""],
  ["Tuesday",0.4895833333,"2nd Session","","","","Stern Shulem","","Markowitz Cheskel / Weiss Shimon","Teichman Yidel","x","Goldhirsch Avrohom Simcha","","Rosinger Mordechai",""],
  ["Tuesday",0.5104166667,"3rd Session","","","","Gottlieb Shulem","","Spitz Moishe / Brown Meir","Twersky Shia","Braver, Naftuli Hersk","Blum Nechemiah","Schwartz Moshe","Silberman Moishe",""],
  ["Tuesday",0.53125,"Lunch","","","","Goldhirsch Avrohom Simcha","","Gottlieb Shulem / Bergman Moishe","Weberman Elimelach","Kaufman, Shimmy","Schlesinger Avraham","Freund Eli","Fogel Efraim",""],
  ["Tuesday",0.5520833333,"Lunch","","","","Teichman Yidel","","Epstein Isaac / Fisch, Moshe","Group Therapy","Group Therapy","Schwartz Shimon","Spitz Moishe","Briskman Shimon",""],
  ["Tuesday",0.5729166667,"English","","","","Fisch, Moshe","","Reich Avraham Shimon / Reinhold, Baruch","Toub Zisman","Prero, Shloimy","Huss Eliyahu Dov","Markowitz Cheskel","Weiss Aron",""],
  ["Tuesday",0.59375,"English","","","","Briskman Shimon","","Pollack Hershy / Rosinger Mordechai","Walk Simcha Bimin","Rothstein Mendy","Kanner Yehudah","Brown Meir","Reichberg Yizchok",""],
  ["Tuesday",0.6145833333,"Math","","","","Oberlander Eli","","Silberman Moishe / Stern Shulem","Gestetner Efraim","Brull Yeshoshua","Weberman Elimelach","Gottlieb Shulem","x",""],
  ["Tuesday",0.6354166667,"Science","","","","Flam Pinchas","","Twersky Shia / Levine, Reuven","Stein, Levi Yitzchok","Blum Nechemiah","Gestetner Abraham","Sofer Yiddi","x",""],
  ["Tuesday","3:46 - 4:30PM","Event","","","","x","","","","","","","",""],
  ["Tuesday",0.6875,"social skill group","","","","Levine, Reuven","","Stein, Levi Yitzchok / Wigder Matis","Schlesinger Avraham","Goldhirsch Avrohom Simcha","Weissman Yitzchok","Klein Mendy","x",""],
  ["Tuesday",0.7083333333,"social skill group","","","","Ehrenfeld Usher","","Oberlander Eli / Feigenbaum Shalom","Flam Pinchas","Schwartz Shimon","Axelrod, Levi Yitzchok","Steiner Aron","x",""],
  ["Tuesday",0.7291666667,"social skill group","","","","x","","Pollak Shmuel (2) / Toub Zisman","Fogel Efraim","Schwartz Moshe","Jeremias Joseph","Taub Efraim","x",""],
  ["Wednesday",0.3854166667,"Breakfast","Lichtenstein Abraham","Kaufman, Shimmy","","","","","","","Landau Berl","","",""],
  ["Wednesday",0.40625,"Breakfast","Rothstein Mendy","Schwartz Moshe","Abramowitz Nechemia","Feigenbaum Shalom","Weiss Shimon","","","","Weissman Yitzchok","","",""],
  ["Wednesday",0.4270833333,"1st session","","","","","","","","","","","",""],
  ["Wednesday",0.4479166667,"2nd Session","","","","","","","","","","","",""],
  ["Wednesday",0.46875,"2nd Session","Silberman Moishe","Brull Yeshoshua","Reich Avraham Shimon","Pollak Shmuel (2)","Schwartz Shimon","","","","Axelrod, Levi Yitzchok","","",""],
  ["Wednesday",0.4895833333,"2nd Session","Wigder Matis","Stein, Levi Yitzchok","Weissman Yosef","Briskman Shimon","Spitz Moishe","","","","Jeremias Joseph","","",""],
  ["Wednesday",0.5104166667,"3rd Session","Kaufman Yisroel Meir","Prero, Shloimy","Pollack Hershy","Spitzer, Moshe Zev","Epstein Isaac","","","","Brauner Benzion","","",""],
  ["Wednesday",0.53125,"Lunch","Gestetner Abraham","Kuperman Favi","Horowitz Chaim","Slomiuc Yehuda","Gestetner Efraim","","","","Mermelstein Yaakov","","",""],
  ["Wednesday",0.5520833333,"Lunch","Landau Berl","Weinberger Rafael","Wosner Menachem","Brauner Benzion","Blum Nechemiah","","","","Briskman David","","x",""],
  ["Wednesday",0.5729166667,"English","Gluck Aron","Salamon Shraga","Briskman David","Mermelstein Yaakov","Halberstam Hersh Meilech","","","","Hershkowitz Yanky","","x",""],
  ["Wednesday",0.59375,"English","x","Schmeltzer Menashe","Schwartz Joel","Abramowits Shimon","Weissman Yitzchok","","","Schwartz Moshe","Schnitzler, Mordechai","","x",""],
  ["Wednesday",0.6145833333,"Math","x","Fogel Efraim","x","Babad Joseph","Schlesinger Avraham","","","Schwartz Shimon","Schwartz Yehudah","","x",""],
  ["Wednesday",0.6354166667,"Science","x","Kanner Yehudah","Weiss Aron","Klein Mendy","Axelrod, Levi Yitzchok","","","Freund Eli","Kish, Yitzchok","","x",""],
  ["Wednesday","3:46 - 4:30PM","Event","x","","","x","x","","","x","x","","",""],
  ["Wednesday",0.6875,"social skill group","x","Sekula Hirsch Meir","x","x","x","","","Markowitz Cheskel","x","","x",""],
  ["Wednesday",0.7083333333,"social skill group","","Pollack Smiel","x","x","x","","","Weiss Shimon","x","","x",""],
  ["Wednesday",0.7291666667,"social skill group","","x","x","x","x","","","Spitz Moishe","x","","x",""],
  ["Thursday",0.3854166667,"Breakfast","","","","","","","","Weiss Shimon","Brauner Benzion","","",""],
  ["Thursday",0.40625,"Breakfast","","","","","","","Levine, Reuven","Markowitz Cheskel","Mermelstein Yaakov","","","Epstein Isaac"],
  ["Thursday",0.4270833333,"1st session","","","","","","","","","","","",""],
  ["Thursday",0.4479166667,"2nd Session","","","","","","","","","","","",""],
  ["Thursday",0.46875,"2nd Session","","","","","","","Schlesinger Avraham","x","Briskman David","","","Lichtenstein Abraham"],
  ["Thursday",0.4895833333,"2nd Session","","","","","","","Oberlander Eli","x","Hershkowitz Yanky","","","Fisch, Moshe"],
  ["Thursday",0.5104166667,"3rd Session","","","","","","","Teichman Yidel","Lichtenstein Abraham","Schnitzler, Mordechai","Wigder Matis","","Bergman Moishe"],
  ["Thursday",0.53125,"Lunch","","","","","","","Stein, Levi Yitzchok","Spitz Moishe","Schwartz Yehudah","Oberlander Eli","","Abramowitz Nechemia"],
  ["Thursday",0.5520833333,"Lunch","","","","","","","Group Therapy","Brown Meir","","Fisher Zev","","Reich Avraham Shimon"],
  ["Thursday",0.5729166667,"English","","","","","","Stern Shulem / Twersky Shia","Weinberger Rafael","Gottlieb Shulem","","Heimfeld Avrohom","","Pollak Shmuel (2)"],
  ["Thursday",0.59375,"English","","","","","","Levine, Reuven / Stein, Levi Yitzchok","Spitzer, Moshe Zev","Sofer Yiddi","","Klein Mendy","","Gestetner Shloime"],
  ["Thursday",0.6145833333,"Math","","","","","","Reinhold, Baruch / Pollack Hershy","Wigder Matis","Bergman Moishe","","Steiner Aron","","Feigenbaum Shalom"],
  ["Thursday",0.6354166667,"Science","","","","","","Rosinger Mordechai / Silberman Moishe","Weberman Elimelach","Epstein Isaac","","Weissman Yosef","","Gross Israel"],
  ["Thursday","3:46 - 4:30PM","Event","","","","","","","","x","","","",""],
  ["Thursday",0.6875,"social skill group","","","","","","Briskman Shimon / Walk Simcha Bimin","x","Abramowitz Nechemia","","Wosner Menachem","","Gluck Aron"],
  ["Thursday",0.7083333333,"social skill group","","","","","","Halberstam Hersh Meilech / Spitzer, Moshe Zev","x","Kuperman Favi","","x","","Stern Shimon"],
  ["Thursday",0.7291666667,"social skill group","","","","","","Kraminar Leiby / Mermelstein Yaakov","x","Kaufman Yisroel Meir","","x","","Abramson, Yochonon"]
];

const STUDENT_CONTACTS = {
  "Abrahamowitz Shimon": {father:"718-541-1979",mother:"347-939-6814",home:"718-686-2766",bestContact:"Father",preferredTime:"Afternoon"},
  "Abramovitz Shlomy": {father:"347-946-5719",mother:"347-628-4818",home:"718-285-4900",bestContact:"",preferredTime:""},
  "Abramson Yochonan": {father:"718-637-7042",mother:"718-344-3446",home:"718-951-2534",bestContact:"Mom",preferredTime:""},
  "Axelrod Levi Yitzchak": {father:"347-633-4680",mother:"908-812-7679",home:"908-812-7679",bestContact:"Both",preferredTime:""},
  "Babad Joseph": {father:"718-208-6843",mother:"718-673-1675",home:"718-935-0120",bestContact:"Both",preferredTime:""},
  "Bergman Moshe": {father:"347-666-4032",mother:"347-232-0365",home:"718-435-4638",bestContact:"Both",preferredTime:""},
  "Blum Nechemia": {father:"646-286-9948",mother:"347-731-9801",home:"718-437-2137",bestContact:"Both",preferredTime:""},
  "Brauner Bentzion": {father:"917-407-2556",mother:"917-407-2558",home:"718-686-8182",bestContact:"Both",preferredTime:""},
  "Braver Naftula": {father:"347-452-5436",mother:"347-388-2440",home:"718-387-0058",bestContact:"Dad",preferredTime:""},
  "Briskman Shimon": {father:"718-753-5000",mother:"917-873-3435",home:"718-438-1049",bestContact:"Mother",preferredTime:""},
  "Briskman Dovid": {father:"718-753-5000",mother:"917-873-3435",home:"718-438-1049",bestContact:"Mother",preferredTime:""},
  "Briskman Isaac": {father:"718-753-5000",mother:"917-873-3435",home:"718-438-1049",bestContact:"Mother",preferredTime:""},
  "Brown Mayer": {father:"917-207-2530",mother:"347-946-4373",home:"718-384-0549",bestContact:"Mother",preferredTime:""},
  "Brull Yehoshua": {father:"347-328-3119",mother:"347-405-4777",home:"718-436-5202",bestContact:"Both",preferredTime:""},
  "Ehrenfeld Usher": {father:"845-642-4165",mother:"718-812-1056",home:"845-425-6409",bestContact:"Mother",preferredTime:""},
  "Epstein Isaac": {father:"347-683-0503",mother:"917-627-3122",home:"718-388-0902",bestContact:"mother",preferredTime:""},
  "Feigenbaum Shalom": {father:"914-645-7941",mother:"845-367-2038",home:"845-425-0574",bestContact:"Both",preferredTime:""},
  "Fisch Moshe": {father:"347-598-2831",mother:"718-930-1780",home:"718-930-1780",bestContact:"Both",preferredTime:""},
  "Fischer Zev": {father:"917-502-0711",mother:"347-831-0264",home:"718-486-0413",bestContact:"Father",preferredTime:""},
  "Flam Pinchas Eliezer": {father:"732-278-9870",mother:"732-278-9819",home:"",bestContact:"Both",preferredTime:""},
  "Fogel Efraim": {father:"914-299-9800",mother:"914-299-4456",home:"718-972-0541",bestContact:"Mom",preferredTime:""},
  "Freund Eli": {father:"347-645-7980",mother:"347-628-4635",home:"718-384-5065",bestContact:"Both",preferredTime:"Mon. & Wed. Afternoon or evening"},
  "Gestetner Avraham": {father:"347-585-0822",mother:"347-986-0557",home:"718-854-4203",bestContact:"Both",preferredTime:"9-10am - 3-4pm 8-10pm"},
  "Gestetner Efraim": {father:"347-693-5150",mother:"347-564-6106",home:"718-853-0195",bestContact:"Father",preferredTime:""},
  "Gestetner Solomon": {father:"347-693-5150",mother:"347-564-6106",home:"718-853-0195",bestContact:"Father",preferredTime:""},
  "Gluck Aaron": {father:"718-414-7191",mother:"347-799-4735",home:"718-232-0552",bestContact:"",preferredTime:""},
  "Goldberger Eliyahu": {father:"347-452-6699",mother:"347-489-1681",home:"347-489-1681",bestContact:"Both",preferredTime:""},
  "Goldhirsch Abraham": {father:"347-898-5715",mother:"917-453-6772",home:"718-384-4562",bestContact:"Father",preferredTime:""},
  "Gottlieb Shulem": {father:"845-637-4369",mother:"845-776-0257",home:"845-783-3652",bestContact:"Father",preferredTime:""},
  "Gross Israel": {father:"646-773-2584",mother:"347-228-1967",home:"718-384-2442",bestContact:"Mom",preferredTime:""},
  "Halberstam Hersh Meilech": {father:"718-208-8614",mother:"718-810-0794",home:"",bestContact:"Mom",preferredTime:""},
  "Haut Aaron": {father:"347-564-9911",mother:"347-598-6989",home:"347-275-8486",bestContact:"",preferredTime:""},
  "Heimfeld Avrohom": {father:"347-801-1666",mother:"347-585-1287",home:"718-871-5795",bestContact:"",preferredTime:""},
  "Herskovic Yanky": {father:"917-796-3798",mother:"347-743-9270",home:"718-599-5291",bestContact:"Both",preferredTime:""},
  "Hollander Hershy": {father:"718-938-6165",mother:"718-541-6930",home:"718-388-3115",bestContact:"Both",preferredTime:""},
  "Horowitz Chaim": {father:"917-882-6228",mother:"",home:"718-435-5142",bestContact:"Father",preferredTime:""},
  "Huss Eliyahu Dov": {father:"",mother:"917-749-8111",home:"",bestContact:"Mother",preferredTime:""},
  "Jeremias Joseph": {father:"518-641-1235",mother:"718-576-0980",home:"718-855-9596",bestContact:"Both",preferredTime:""},
  "Kanner Avraham": {father:"347-486-0542",mother:"347-461-7605",home:"732-341-1490",bestContact:"Both",preferredTime:""},
  "Kaufman Yisroel Meir": {father:"347-775-7677",mother:"929-289-4432",home:"929-289-4432",bestContact:"Both",preferredTime:""},
  "Kaufman Shimon": {father:"347-775-7677",mother:"929-289-4432",home:"929-289-4432",bestContact:"Both",preferredTime:""},
  "Kish Yitzchok": {father:"718-757-9385",mother:"917-586-8138",home:"718-438-6712",bestContact:"Dad (Step Dad)",preferredTime:""},
  "Klein Mendy": {father:"347 452 7007",mother:"718 208 5298",home:"718 431 2244",bestContact:"Father",preferredTime:""},
  "Kramanier Tzvi": {father:"917-439-8443",mother:"347-504-3086",home:"718-686-1065",bestContact:"Dad",preferredTime:""},
  "Kupperman Zev": {father:"718-781-0607",mother:"718-812-6412",home:"718-437-7627",bestContact:"Mother",preferredTime:""},
  "Landau Berl": {father:"347-357-9050",mother:"845-200-8296",home:"845-782-8625",bestContact:"",preferredTime:""},
  "Levine Reuven": {father:"347-582-0502",mother:"347-775-4145",home:"718-871-0463",bestContact:"Mom Only",preferredTime:""},
  "Lichtenstein Abraham": {father:"",mother:"718-986-1321",home:"",bestContact:"Mother",preferredTime:""},
  "Lowenbraun Elimelech": {father:"917-826-2654",mother:"",home:"347-915-2585",bestContact:"Dad (Mom deceased)",preferredTime:""},
  "Markowitz Cheskel": {father:"917-577-9109",mother:"646-235-4968",home:"718-797-5798",bestContact:"",preferredTime:""},
  "Mermelstein Yaakov": {father:"347-721-7289",mother:"347-415-2369",home:"718-438-5374",bestContact:"Both",preferredTime:""},
  "Oberlander Eli": {father:"718-930-9610",mother:"347-585-6126",home:"718-218-7247",bestContact:"Mother",preferredTime:""},
  "Pollak Shmiel": {father:"347-451-0520",mother:"347-898-7818",home:"718-599-1163",bestContact:"father",preferredTime:""},
  "Pollak Shmuel": {father:"917-697-7940",mother:"929-417-0091",home:"718-599-0030",bestContact:"Dad",preferredTime:""},
  "Pollak Hershel": {father:"347-486-2555",mother:"347-633-4745",home:"718-387-0565",bestContact:"Dad",preferredTime:""},
  "Prero Solomon/ Shlomy": {father:"917-683-7594",mother:"347-684-4000",home:"718-686-1781",bestContact:"Both",preferredTime:""},
  "Reich Avraham Shimon": {father:"",mother:"718-669-5940",home:"718-486-5940",bestContact:"Mother",preferredTime:""},
  "Reichberg Yitzchok": {father:"718-513-9460",mother:"718 541 8552",home:"347 243 0089",bestContact:"Both",preferredTime:"afternoon 2pm"},
  "Reinhold Boruch": {father:"917-995-2822",mother:"917-968-1936",home:"917-968-1936",bestContact:"Both",preferredTime:""},
  "Rosinger Mordche": {father:"718-576-8665",mother:"917-627-0430",home:"718-388-0338",bestContact:"Both",preferredTime:""},
  "Rothstein Mendy": {father:"718-809-0365",mother:"917-892-2718",home:"718-435-0760",bestContact:"Mother",preferredTime:""},
  "Salamon Jacob": {father:"347-728-8854",mother:"347-512-9793",home:"718-963-9082",bestContact:"Mother",preferredTime:""},
  "Salamon Shraga": {father:"917-569-5878",mother:"917-232-7471",home:"718-963-2618",bestContact:"Father",preferredTime:""},
  "Schlesinger Avraham": {father:"718-781-6229",mother:"718-781-6538",home:"718-853-0510",bestContact:"Both",preferredTime:"morning & evening"},
  "Schmeltzer Menashe": {father:"718-722-1194",mother:"347-351-1691",home:"718-435-8575",bestContact:"",preferredTime:""},
  "Schnitzler Motty": {father:"718-873-6715",mother:"718-757-1928",home:"718-222-8133",bestContact:"Father & Mother",preferredTime:""},
  "Schwartz Yehudah": {father:"347-228-1790",mother:"718-812-0961",home:"718-232-1495",bestContact:"Both",preferredTime:""},
  "Schwartz Joel": {father:"347-385-2711",mother:"347-946-5284",home:"718-486-5273",bestContact:"Both",preferredTime:"morning"},
  "Schwartz Moshe": {father:"929-289-0472",mother:"929-884-5368",home:"718-435-5321",bestContact:"Mother Only",preferredTime:""},
  "Schwartz Shimon": {father:"917-671-7128",mother:"347-423-2755",home:"",bestContact:"Father",preferredTime:""},
  "Sekula Hersh": {father:"718-810-2146",mother:"347-661-1875",home:"718-435-2627",bestContact:"Mother",preferredTime:""},
  "Silberman Moshe": {father:"347-661-1005",mother:"347-729-5718",home:"718 851 8014",bestContact:"Mother",preferredTime:""},
  "Slomiuc Yehuda": {father:"718-483-3630",mother:"347-436-6033",home:"718-851-2243",bestContact:"Mother",preferredTime:""},
  "Soifer Yehuda": {father:"347-351-8397",mother:"718-851-0891",home:"",bestContact:"",preferredTime:""},
  "Spitz Moshe": {father:"347-661-5615",mother:"347-790-2589",home:"718-388-8571",bestContact:"Both",preferredTime:"all day"},
  "Spitzer Moshe Zev": {father:"917-684-4087",mother:"347-432-7648",home:"718-851-1628",bestContact:"Both",preferredTime:""},
  "Stein Isaac": {father:"917-940-2787",mother:"917-940-2769",home:"718-857-1358",bestContact:"Mom",preferredTime:""},
  "Stern Shimon": {father:"845-548-7509",mother:"646-354-8582",home:"718-435-6706",bestContact:"Father",preferredTime:""},
  "Stern Shulem": {father:"347-678-1042",mother:"347-423-3471",home:"718-858-2535",bestContact:"Both",preferredTime:""},
  "Taub Efraim": {father:"646-573-9374",mother:"718-551-8461",home:"718-935-1891",bestContact:"Both",preferredTime:""},
  "Teichman Yidel": {father:"718-213-0744",mother:"347-308-3105",home:"929-625-5567",bestContact:"",preferredTime:""},
  "Toub Zisman": {father:"347-512-6483",mother:"347-512-6486",home:"718-851-1851",bestContact:"Mother",preferredTime:"Afternoon"},
  "Twerski Joshua": {father:"773-339-2375",mother:"929-512-1737",home:"773-861-2509",bestContact:"",preferredTime:""},
  "Wallk Simcha Binim": {father:"917-544-3486",mother:"347-374-1276",home:"718-256-3980",bestContact:"Both",preferredTime:""},
  "Weberman Elimelech": {father:"",mother:"718-213-6969",home:"",bestContact:"Mother Only",preferredTime:""},
  "Weinberger Rafael": {father:"732-600-0711",mother:"848-210-4474",home:"732-367-6282",bestContact:"Both",preferredTime:""},
  "Weiss Shimon": {father:"347 452 7206",mother:"718 619 6664",home:"718 486 5086",bestContact:"Father",preferredTime:"morning"},
  "Weiss Aaron": {father:"718-483-0536",mother:"718-757-7068",home:"718-285-4186",bestContact:"",preferredTime:""},
  "Weissman Joseph": {father:"",mother:"",home:"",bestContact:"",preferredTime:""},
  "Wigder Matis": {father:"347-533-2317",mother:"347-461-6449",home:"718-951-4097",bestContact:"Both",preferredTime:""},
  "Wosner Menachem": {father:"347-243-0078",mother:"",home:"732-569-6514",bestContact:"Father",preferredTime:""}
};
const PROVIDER_MANDATES = {
  "Goldberger - SLP": ["Briskman Isaac", "Gestetner Abraham", "Gluck Aron", "Kaufman Yisroel Meir", "Landau Berl", "Lichtenstein Abraham", "Markowitz Cheskel", "Rosinger Mordechai", "Rothstein Mendy", "Schwartz Yehudah", "Silberman Moishe", "Toub Zisman", "Walk Simcha Bimin", "Wigder Matis"],
  "Friedman - SLP": ["Braver, Naftuli Hersk", "Brull Yeshoshua", "Fisher Zev", "Fogel Efraim", "Freund Eli", "Gestetner Shloime", "Gross Israel", "Huss Eliyahu Dov", "Kanner Yehudah", "Kaufman, Shimmy", "Kuperman Favi", "Pollack Smiel", "Prero, Shloimy", "Salamon Shraga", "Schmeltzer Menashe", "Schnitzler, Mordechai", "Schwartz Moshe", "Sekula Hirsch Meir", "Stein, Levi Yitzchok", "Weinberger Rafael"],
  "Ziegler - SLP": ["Abramowitz Nechemia", "Briskman David", "Hershkowitz Yanky", "Horowitz Chaim", "Pollack Hershy", "Reich Avraham Shimon", "Schwartz Joel", "Weiss Aron", "Weissman Yosef", "Wosner Menachem"],
  "Horowitz - SLP": ["Abramowits Shimon", "Abramson, Yochonon", "Babad Joseph", "Brauner Benzion", "Briskman Shimon", "Brown Meir", "Ehrenfeld Usher", "Feigenbaum Shalom", "Fisch, Moshe", "Flam Pinchas", "Goldhirsch Avrohom Simcha", "Gottlieb Shulem", "Klein Mendy", "Levine, Reuven", "Mermelstein Yaakov", "Oberlander Eli", "Pollak Shmuel (2)", "Slomiuc Yehuda", "Sofer Yiddi", "Spitzer, Moshe Zev", "Steiner Aron", "Stern Shulem", "Taub Efraim", "Teichman Yidel"],
  "Herbst - SLP": ["Axelrod, Levi Yitzchok", "Bergman Moishe", "Blum Nechemiah", "Epstein Isaac", "Gestetner Efraim", "Goldberger Eliyahu", "Halberstam Hersh Meilech", "Heimfeld Avrohom", "Jeremias Joseph", "Kish, Yitzchok", "Kraminar Leiby", "Lowenbraun, Eli", "Reinhold, Baruch", "Schlesinger Avraham", "Schwartz Shimon", "Spitz Moishe", "Stern Shimon", "Twersky Shia", "Weberman Elimelach", "Weiss Shimon", "Weissman Yitzchok"],
  "Schachter - PT": ["Bergman Moishe", "Blum Nechemiah", "Briskman Shimon", "Brown Meir", "Brull Yeshoshua", "Epstein Isaac", "Feigenbaum Shalom", "Fisch, Moshe", "Freund Eli", "Gottlieb Shulem", "Halberstam Hersh Meilech", "Klein Mendy", "Kraminar Leiby", "Levine, Reuven", "Markowitz Cheskel", "Mermelstein Yaakov", "Oberlander Eli", "Pollack Hershy", "Pollak Shmuel (2)", "Reich Avraham Shimon", "Reinhold, Baruch", "Rosinger Mordechai", "Salamon Shraga", "Schwartz Moshe", "Schwartz Shimon", "Sekula Hirsch Meir", "Silberman Moishe", "Spitz Moishe", "Spitzer, Moshe Zev", "Stein, Levi Yitzchok", "Stern Shimon", "Stern Shulem", "Toub Zisman", "Twersky Shia", "Walk Simcha Bimin", "Weiss Shimon", "Wigder Matis"],
  "Malks - OT": ["Briskman Shimon", "Feigenbaum Shalom", "Flam Pinchas", "Fogel Efraim", "Gestetner Efraim", "Halberstam Hersh Meilech", "Levine, Reuven", "Oberlander Eli", "Pollak Shmuel (2)", "Schlesinger Avraham", "Spitzer, Moshe Zev", "Stein, Levi Yitzchok", "Teichman Yidel", "Toub Zisman", "Twersky Shia", "Walk Simcha Bimin", "Weberman Elimelach", "Weinberger Rafael", "Wigder Matis"],
  "Dyckman - OT": ["Abramowitz Nechemia", "Bergman Moishe", "Blum Nechemiah", "Braver, Naftuli Hersk", "Brown Meir", "Brull Yeshoshua", "Epstein Isaac", "Fisch, Moshe", "Freund Eli", "Goldhirsch Avrohom Simcha", "Gottlieb Shulem", "Horowitz Chaim", "Kaufman Yisroel Meir", "Kaufman, Shimmy", "Kuperman Favi", "Lichtenstein Abraham", "Markowitz Cheskel", "Pollack Hershy", "Prero, Shloimy", "Reich Avraham Shimon", "Reinhold, Baruch", "Rosinger Mordechai", "Rothstein Mendy", "Schwartz Moshe", "Schwartz Shimon", "Silberman Moishe", "Sofer Yiddi", "Spitz Moishe", "Stern Shulem", "Weiss Shimon"],
  "Fischer - CO": ["Axelrod, Levi Yitzchok", "Blum Nechemiah", "Brauner Benzion", "Braver, Naftuli Hersk", "Briskman David", "Brull Yeshoshua", "Flam Pinchas", "Gestetner Abraham", "Goldhirsch Avrohom Simcha", "Hershkowitz Yanky", "Huss Eliyahu Dov", "Jeremias Joseph", "Kanner Yehudah", "Kish, Yitzchok", "Landau Berl", "Mermelstein Yaakov", "Prero, Shloimy", "Rothstein Mendy", "Schlesinger Avraham", "Schnitzler, Mordechai", "Schwartz Shimon", "Schwartz Yehudah", "Weberman Elimelach", "Weissman Yitzchok"],
  "Kerenkraut - CO": ["Abramowits Shimon", "Babad Joseph", "Brown Meir", "Fisher Zev", "Freund Eli", "Gottlieb Shulem", "Heimfeld Avrohom", "Klein Mendy", "Markowitz Cheskel", "Oberlander Eli", "Schwartz Moshe", "Sofer Yiddi", "Spitz Moishe", "Stein, Levi Yitzchok", "Steiner Aron", "Taub Efraim", "Weiss Shimon", "Weissman Yosef", "Wigder Matis", "Wosner Menachem"],
  "Werner - CO": ["Briskman Shimon", "Ehrenfeld Usher", "Fogel Efraim", "Goldberger Eliyahu", "Halberstam Hersh Meilech", "Kaufman Yisroel Meir", "Kuperman Favi", "Pollack Hershy", "Reichberg Yizchok", "Reinhold, Baruch", "Rosinger Mordechai", "Schwartz Joel", "Sekula Hirsch Meir", "Silberman Moishe", "Spitzer, Moshe Zev", "Stern Shulem", "Toub Zisman", "Walk Simcha Bimin", "Weiss Aron"],
  "Weber - CO": ["Abramowitz Nechemia", "Abramson, Yochonon", "Bergman Moishe", "Epstein Isaac", "Feigenbaum Shalom", "Fisch, Moshe", "Gestetner Shloime", "Gluck Aron", "Gross Israel", "Lichtenstein Abraham", "Pollak Shmuel (2)", "Reich Avraham Shimon", "Salamon Shraga", "Schmeltzer Menashe", "Stern Shimon"],
  "Fayersteyn - CO": ["Briskman Isaac", "Gestetner Efraim", "Horowitz Chaim", "Kaufman, Shimmy", "Kraminar Leiby", "Levine, Reuven", "Lowenbraun, Eli", "Slomiuc Yehuda", "Teichman Yidel", "Twersky Shia", "Weinberger Rafael"]
};

// Helper: split a timeslot cell value into individual student names
function splitCellStudents(cell){
  if(!cell||cell==='x'||cell.startsWith('Group')) return [];
  return cell.split('/').map(s=>s.trim()).filter(s=>s&&s!=='x');
}

// Normalize a single word to a canonical form for fuzzy name matching
function _normWord(w){
  w=w.toLowerCase().replace(/[,.']/g,'').trim();
  // Common Hebrew/Yiddish name variant → canonical
  const MAP={
    'avraham':'avrohom','abraham':'avrohom','avrohom':'avrohom',
    'aharon':'aron','aaron':'aron','aron':'aron',
    'moishe':'moshe','moshe':'moshe',
    'naftuli':'naftula','naftula':'naftula','naftuli hersk':'naftula',
    'yeshoshua':'yehoshua','yehoshua':'yehoshua',
    'nechemiah':'nechemia','nechemia':'nechemia',
    'bentzion':'benzion','benzion':'benzion',
    'mordche':'mordechai','mordechai':'mordechai',
    'shloimy':'shlomo','shloime':'shlomo','shlomy':'shlomo','solomon':'shlomo','shlomo':'shlomo',
    'shloimy':'shlomo',
    'yizchok':'yitzchok','yitzhok':'yitzchok','yitzchok':'yitzchok',
    'hirsch':'hersh','hersh':'hersh','hersh meir':'hersh','hirsch meir':'hersh',
    'smiel':'shmiel','shmuel':'shmuel','shmiel':'shmiel',
    'yiddi':'yidel','yidel':'yidel',
    'simcha binim':'simcha','simcha bimin':'simcha',
    'elimelach':'elimelech','elimelech':'elimelech',
    'yehuda':'yehudah','yehudah':'yehudah',
    'boruch':'baruch','baruch':'baruch',
    'avrohom simcha':'avrohom',
    'levi yitzchak':'levi','levi yitzchok':'levi',
    'yanky':'yanky','yanki':'yanky',
    'favi':'zev','kuperman':'kuperman',  // Favi = Zev (nickname)
    'prero':'prero',
    'herskowitz':'herskovic','hershkowitz':'herskovic',
    'hersk':'naftula',
    'leiby':'leiby','kramanier':'kraminar','kraminar':'kraminar',
    'steiner':'steiner','aron':'aron',
    'stein levi yitzchok':'stein',
    'spitzer moshe zev':'spitzer',
    'walk':'wallk','wallk':'wallk',
    'weissman':'weissman','weiss':'weiss',
    'reichberg':'reichberg','yizchok':'yitzchok',
    'sekula':'sekula','hirsch meir':'hersh',
    'twersky':'twerski','twerski':'twerski',
    'rosinger':'rosinger','mordechai':'mordechai','mordche':'mordechai',
    'silberman':'silberman','moishe':'moshe',
    'sofer':'soifer','soifer':'soifer',
    'spitz':'spitz',
    'pollack':'pollak','pollak':'pollak',
    'hershy':'hershel','hershel':'hershel',
    'shia':'joshua','joshua':'joshua',  // Shia = Yehoshua = Joshua
    'bimin':'binim','binim':'binim',    // Simcha Bimin/Binim
    'naftuli hersk':'naftula','hersk':'naftula',
    'yosef':'joseph','joseph':'joseph', // Weissman Yosef / Joseph
    'yitzchok':'yitzchok','yitzchak':'yitzchok',
    'yehudah':'yehuda','yehuda':'yehuda',
    'efraim':'efraim','ephraim':'efraim',
    'chaim':'chaim','haim':'chaim',
    'zev':'zev','zvi':'zev',           // Fischer Zev / Fisher Zev
    'fisher':'fischer','fischer':'fischer', // last name variant
    'steiner':'steiner',
    'smiel':'shmiel',
    'brauner':'brauner','benzion':'benzion',
    'goldhirsch':'goldhirsch',
    'gluck':'gluck',
    'gestetner':'gestetner','shloime':'shlomo',
    'kanner':'kanner','yehudah':'yehudah',
    'lowenbraun':'lowenbraun','eli':'eli',
    'shimmy':'shimon','shimon':'shimon',  // Shimmy = Shimon
    'yochonon':'yochonan','yochonan':'yochonan',
  };
  return MAP[w]||w;
}
function _normName(name){
  // Normalize full name: strip commas/punctuation, lower, map each word
  return name.toLowerCase().replace(/[,.']/g,' ').replace(/\s+/g,' ').trim()
    .split(' ').filter(Boolean).map(_normWord).join(' ');
}
function getStudentContact(name){
  if(STUDENT_CONTACTS[name]) return STUDENT_CONTACTS[name];
  // 1. Case-insensitive exact
  const nl=name.toLowerCase().replace(/[,.']/g,' ').replace(/\s+/g,' ').trim();
  for(const k in STUDENT_CONTACTS){
    if(k.toLowerCase().replace(/[,.']/g,' ').replace(/\s+/g,' ').trim()===nl) return STUDENT_CONTACTS[k];
  }
  // 2. Normalized name exact
  const nn=_normName(name);
  for(const k in STUDENT_CONTACTS){
    if(_normName(k)===nn) return STUDENT_CONTACTS[k];
  }
  // 3. Word overlap on normalized words (last name + at least one first name word)
  const nw=nn.split(' ').filter(Boolean);
  let best=null, bestScore=0;
  for(const k in STUDENT_CONTACTS){
    const kw=_normName(k).split(' ').filter(Boolean);
    const overlap=nw.filter(w=>kw.includes(w));
    // Require last name match (first word) + at least one other word
    if(overlap.length>=2 && (nw[0]===kw[0]||overlap.includes(nw[0]))){
      if(overlap.length>bestScore){bestScore=overlap.length;best=STUDENT_CONTACTS[k];}
    }
  }
  if(best) return best;
  // 4. Loose: just last name + any one word match
  for(const k in STUDENT_CONTACTS){
    const kw=_normName(k).split(' ').filter(Boolean);
    if(nw[0]&&kw[0]&&nw[0]===kw[0]){
      const overlap=nw.filter(w=>kw.includes(w));
      if(overlap.length>=1&&overlap.length>bestScore){bestScore=overlap.length;best=STUDENT_CONTACTS[k];}
    }
  }
  return best||null;
}

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
function getTypeClass(p) { return p.includes('SLP')?'badge-slp':p.includes('OT')?'badge-ot':p.includes('PT')?'badge-pt':p.includes('LMSW')?'badge-lmsw':'badge-co'; }

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
function showProviderView(provider,tab){
  providerCallTab=tab||providerCallTab||'schedule';
  const container=document.getElementById('providerView');
  if(providerCallTab==='calls'){
    const wk=getWeekKey(), pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
    container.style.display='block';
    document.getElementById('adminView').style.display='none';
    const pSafe=provider.replace(/'/g,"\\'");
    let html='<div class="prov-tabs no-print">'
      +'<button class="prov-tab" onclick="showProviderView(\''+pSafe+'\',\'schedule\')">Schedule</button>'
      +'<button class="prov-tab active" onclick="showProviderView(\''+pSafe+'\',\'calls\')">Parent Calls</button>'
      +'</div>';
    html+=renderParentCallsTab(provider);
    container.innerHTML=html;
    return;
  }
  const wk=getWeekKey(), pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
  container.style.display='block';
  document.getElementById('adminView').style.display='none';

  // Build schedule lookup from Timeslot Schedule: name→[{day,time,subject}]
  // Cells may contain multiple students separated by " / "
  const schedLookup={};
  RAW.forEach(function(row){
    var cell=(row[colIdx]||'').trim();
    if(!cell||cell==='x'||cell.startsWith('Group')) return;
    cell.split('/').forEach(function(part){
      var s=part.trim();
      if(!s||s==='x') return;
      if(!schedLookup[s]) schedLookup[s]=[];
      schedLookup[s].push({day:row[0],time:row[1],subject:row[2]});
    });
  });
  // Fuzzy match: find schedule key for a mandate name
  function findScheduleKey(name){
    if(schedLookup[name]) return name;
    var nl=name.toLowerCase().trim();
    for(var k in schedLookup){ if(k.toLowerCase().trim()===nl) return k; }
    var nw=nl.split(' ');
    for(var k in schedLookup){
      var kw=k.toLowerCase().trim().split(' ');
      var m=nw.filter(function(w){return kw.some(function(kk){return kk===w;});});
      if(m.length>=2) return k;
    }
    return null;
  }

  // Use mandate list as the source of students
  var mandateStudents=(PROVIDER_MANDATES[provider]||[]);
  var byDay={};DAYS_ORDER.forEach(function(d){byDay[d]=[];});
  var unscheduled=[];
  var total=0,seen=0,absent=0;

  mandateStudents.forEach(function(student){
    var schedKey=findScheduleKey(student);
    if(schedKey && schedLookup[schedKey] && schedLookup[schedKey].length){
      schedLookup[schedKey].forEach(function(slot){
        var done=isChecked(wk,provider,slot.day,slot.time,student);
        var ab=isAbsent(wk,provider,slot.day,slot.time,student);
        var nc=isNc(wk,provider,slot.day,slot.time,student);
        if(!byDay[slot.day]) byDay[slot.day]=[];
        byDay[slot.day].push({time:slot.time,subject:slot.subject,student:student,done:done,absent:ab,nc:nc});
        total++;if(done)seen++;if(ab)absent++;
      });
    } else {
      unscheduled.push(student);
    }
  });

  var html='<div class="week-banner"><div><div class="week-label">Week of '+getWeekRange()+'</div>'
    +'<div class="week-sub">Checkoffs reset every Sunday</div></div>'
    +'<div class="week-reset-badge">Next reset: '+getNextSunday()+'</div></div>'
    +'<div class="print-bar no-print"><button class="btn-print" onclick="window.print()">Print / Share</button></div>'
    +'<div class="summary-bar">'
    +'<div class="summary-card"><div class="num" id="sumTotal">'+total+'</div><div class="lbl">Total</div></div>'
    +'<div class="summary-card green"><div class="num" id="sumSeen">'+seen+'</div><div class="lbl">Seen</div></div>'
    +'<div class="summary-card orange"><div class="num" id="sumRemain">'+(total-seen-absent)+'</div><div class="lbl">Remaining</div></div>'
    +'<div class="summary-card red"><div class="num" id="sumAbsent">'+absent+'</div><div class="lbl">Absent</div></div>'
    +'</div>';

  DAYS_ORDER.forEach(function(day){
    var sessions=byDay[day];if(!sessions||!sessions.length)return;
    sessions.sort(function(a,b){return a.time-b.time;});
    html+='<div class="day-block"><div class="day-header">'+day+'</div>';
    sessions.forEach(function(s){
      var id=makeId(day,s.time,s.student);
      var rowCls=s.absent?' absent-row':s.nc?' noncompliant-row':s.done?' checked':'';
      var nameStyle=s.done?'text-decoration:line-through;color:#68d391;':s.absent?'color:#c53030;':s.nc?'color:#c05621;':'';
      var pE=provider.replace(/'/g,"\\'"),sE=s.student.replace(/'/g,"\\'");
      var tagHtml=s.absent?'<span class="status-tag absent">Absent</span>':s.nc?'<span class="status-tag nc">Non-Compliant</span>':'<span class="status-tag"></span>';
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

  // Unscheduled mandate students
  if(unscheduled.length){
    html+='<div class="day-block"><div class="day-header" style="background:#718096;">Not Yet Scheduled</div>';
    unscheduled.forEach(function(student){
      html+='<div class="session-row" style="opacity:0.6;">'
        +'<div class="time-col" style="color:#a0aec0;">—</div>'
        +'<div class="subject-col"></div>'
        +'<div class="student-name">'+student+'</div>'
        +'<span class="badge-unscheduled">Pending</span>'
        +'<div class="action-btns"></div>'
        +'</div>';
    });
    html+='</div>';
  }

  var pSafe2=provider.replace(/'/g,"\\'");
  container.innerHTML='<div class="prov-tabs no-print">'
    +'<button class="prov-tab active" onclick="showProviderView(\''+pSafe2+'\',\'schedule\')">Schedule</button>'
    +'<button class="prov-tab" onclick="showProviderView(\''+pSafe2+'\',\'calls\')">Parent Calls</button>'
    +'</div>'+html;
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


/* --- PARENT CALL LOG --- */
let providerCallTab = 'schedule'; // 'schedule' or 'calls'

function getCallEntry(provider, student){
  try{ const log=JSON.parse(localStorage.getItem('calllog_2627')||'{}'); return log[provider+'||'+student]||{status:'',note:''}; }catch(e){return {status:'',note:''};}
}
function setCallStatus(provider, student, status){
  try{
    const log=JSON.parse(localStorage.getItem('calllog_2627')||'{}');
    const key=provider+'||'+student;
    const cur=log[key]||{status:'',note:''};
    cur.status=(cur.status===status)?'':status;
    cur.ts=Date.now();
    log[key]=cur;
    localStorage.setItem('calllog_2627',JSON.stringify(log));
    renderCallCard(provider,student);
    updateCallSummary(provider);
  }catch(e){}
}
function setCallNote(provider, student, note){
  try{
    const log=JSON.parse(localStorage.getItem('calllog_2627')||'{}');
    const key=provider+'||'+student;
    const cur=log[key]||{status:'',note:''};
    cur.note=note; cur.ts=Date.now();
    log[key]=cur;
    localStorage.setItem('calllog_2627',JSON.stringify(log));
  }catch(e){}
}

const CALL_OPTS=[
  {key:'talked',   icon:'', label:'Talked',          cls:'cs-talked'},
  {key:'nopickup', icon:'', label:'No Answer',        cls:'cs-nopickup'},
  {key:'voicemail',icon:'', label:'Voicemail',        cls:'cs-vm'},
  {key:'multitried',icon:'',label:'Tried Multiple',   cls:'cs-multi'},
  {key:'callback', icon:'', label:'Will Call Back',   cls:'cs-callback'},
];

function callCardId(student){ return 'cc_'+makeId('',0,student); }
function renderCallCard(provider, student){
  const el=document.getElementById(callCardId(student));
  if(!el) return;
  const entry=getCallEntry(provider,student);
  const opt=CALL_OPTS.find(o=>o.key===entry.status);
  el.className='call-card'+(opt?' '+opt.cls:'');
}
function updateCallSummary(provider){
  const el=document.getElementById('callSummary');
  if(!el) return;
  const pIdx=PROVIDERS.indexOf(provider),colIdx=pIdx+3;
  const students=new Set();
  RAW.forEach(row=>{ const s=(row[colIdx]||'').trim(); if(s&&s!=='x'&&!s.startsWith('Group'))students.add(s); });
  let talked=0,total=students.size;
  students.forEach(s=>{ const e=getCallEntry(provider,s); if(e.status==='talked')talked++; });
  el.textContent=talked+' / '+total+' contacted';
}

function renderParentCallsTab(provider){
  const pIdx=PROVIDERS.indexOf(provider), colIdx=pIdx+3;
  // Build set of scheduled students from RAW timeslots for this provider
  const scheduledSet=new Set();
  RAW.forEach(function(row){
    var cell=(row[colIdx]||'').trim();
    if(!cell||cell==='x'||cell.startsWith('Group')) return;
    cell.split('/').forEach(function(part){var s=part.trim();if(s&&s!=='x')scheduledSet.add(s);});
  });
  // Use mandate list as the full student list
  const allStudents=(PROVIDER_MANDATES[provider]||[]).slice().sort();
  var talked=0;
  allStudents.forEach(function(s){if(getCallEntry(provider,s).status==='talked')talked++;});
  var pSafeD=provider.replace(/'/g,"\\'");
  var html='<div class="call-log-bar"><div class="call-log-title">Parent Call Log</div>'
    +'<div style="display:flex;align-items:center;gap:8px;">'
    +'<div class="call-summary" id="callSummary">'+talked+' / '+allStudents.length+' contacted</div>'
    +'<button onclick="downloadProviderCallLogExcel(\''+pSafeD+'\')" style="font-size:0.72rem;padding:4px 10px;background:#276749;color:#fff;border:none;border-radius:6px;cursor:pointer;">Download Excel</button>'
    +'</div></div>';
  allStudents.forEach(function(student){
    var entry=getCallEntry(provider,student);
    var opt=CALL_OPTS.find(function(o){return o.key===entry.status;});
    var contact=getStudentContact(student);
    var pE=provider.replace(/'/g,"\\'"),sE=student.replace(/'/g,"\\'");
    // Fuzzy check: is this student in the timeslot schedule?
    var inSchedule=scheduledSet.has(student);
    if(!inSchedule){
      // Try case-insensitive match
      var sl=student.toLowerCase().trim();
      scheduledSet.forEach(function(k){if(k.toLowerCase().trim()===sl)inSchedule=true;});
    }
    var isUnscheduled=!inSchedule;
    html+='<div class="call-card'+(opt?' '+opt.cls:'')+'" id="'+callCardId(student)+'">';
    html+='<div class="call-card-name">'+student;
    if(isUnscheduled)html+=' <span class="badge-unscheduled">Not yet scheduled</span>';
    html+='</div>';
    if(contact){
      html+='<div class="call-contacts-row">';
      if(contact.father){var fd=contact.father.replace(/[^0-9+]/g,'');html+='<a class="call-num father" href="tel:'+fd+'">F: '+contact.father+'</a>';}
      if(contact.mother){var md=contact.mother.replace(/[^0-9+]/g,'');html+='<a class="call-num mother" href="tel:'+md+'">M: '+contact.mother+'</a>';}
      var bc=contact.bestContact;
      if(bc&&bc!=='Both'&&bc!=='')html+='<span class="best-contact-tag">'+bc+'</span>';
      if(contact.preferredTime)html+='<span class="pref-time-tag">'+contact.preferredTime+'</span>';
      html+='</div>';
    } else {
      html+='<div class="call-contacts-row"><span style="color:#a0aec0;font-size:0.78rem;">No contact info on file</span></div>';
    }
    html+='<div class="call-status-btns">';
    CALL_OPTS.forEach(function(o){
      var active=entry.status===o.key?' active':'';
      html+='<button class="call-status-btn opt-'+o.key+active+'" onclick="setCallStatus(\''+pE+'\',\''+sE+'\',\''+o.key+'\')">'+o.icon+' '+o.label+'</button>';
    });
    html+='</div>';
    var noteId='cnote_'+makeId('',0,student);
    html+='<textarea class="call-note-input" id="'+noteId+'" placeholder="Notes..." onchange="setCallNote(\''+pE+'\',\''+sE+'\',this.value)">'  +((entry.note||'').replace(/</g,'&lt;'))+'</textarea>';
    html+='</div>';
  });
  return html;
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
  const cacheMatchesView = sbCacheWeek === getActiveWeekKey();
  if(sbLoadStatus===true) el.innerHTML='&#128994; Supabase: '+count+' record'+(count!==1?'s':'')+' loaded'+(cacheMatchesView?'':' <span style="color:#fbd38d;">(wrong week — refreshing)</span>')+' &nbsp;<button onclick="adminRefreshNow()" style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.4);color:white;border-radius:5px;padding:2px 10px;cursor:pointer;font-size:0.75rem;">&#8635; Refresh</button>';
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
  html += '<button class="admin-tab' + (adminTab === 'calllogs' ? ' active' : '') + '" onclick="setAdminTab(&quot;calllogs&quot;)">Call Logs</button>';
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
  const useSb=Object.keys(sbCache).length>0 && sbCacheWeek===wk;
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
  } else if(adminTab==='calllogs'){
    var clHtml='<div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;">'
      +'<button class="btn-sync" style="background:linear-gradient(135deg,#276749,#38a169);" onclick="downloadCallLogExcel()">Download All Providers (Excel)</button>'
      +'</div>';
    PROVIDERS.forEach(function(prov){
      var students=(PROVIDER_MANDATES[prov]||[]).slice().sort();
      var talked=0;
      students.forEach(function(s){if(getCallEntry(prov,s).status==='talked')talked++;});
      clHtml+='<div class="provider-card"><div class="provider-card-header" onclick="toggleProvCard(\'cl_'+PROVIDERS.indexOf(prov)+'\')">'
        +'<h3><span class="badge '+getTypeClass(prov)+'">'+( prov.split(' - ')[1]||'CO')+'</span> &nbsp;'+prov.split(' - ')[0]+'</h3>'
        +'<div style="font-size:0.8rem;color:#718096;">'+talked+' / '+students.length+' contacted</div>'
        +'</div>'
        +'<div class="provider-sessions" id="cl_'+PROVIDERS.indexOf(prov)+'">';
      students.forEach(function(student){
        var entry=getCallEntry(prov,student);
        var opt=CALL_OPTS.find(function(o){return o.key===entry.status;});
        var contact=getStudentContact(student);
        clHtml+='<div class="admin-session-row" style="flex-wrap:wrap;gap:4px;">'
          +'<div style="flex:1;min-width:140px;font-weight:600;font-size:0.84rem;">'+student+'</div>'
          +'<div style="min-width:100px;font-size:0.78rem;color:#2b6cb0;">'+(opt?opt.label:'Not called')+'</div>';
        if(contact){
          if(contact.father)clHtml+='<a class="call-num father" href="tel:'+contact.father.replace(/[^0-9+]/g,'')+'">F: '+contact.father+'</a>';
          if(contact.mother)clHtml+='<a class="call-num mother" href="tel:'+contact.mother.replace(/[^0-9+]/g,'')+'">M: '+contact.mother+'</a>';
        }
        if(entry.note)clHtml+='<div style="width:100%;font-size:0.76rem;color:#718096;font-style:italic;padding-left:4px;">'+entry.note.replace(/</g,'&lt;')+'</div>';
        clHtml+='</div>';
      });
      clHtml+='</div></div>';
    });
    el.innerHTML=clHtml;
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

// ── Excel download (SheetJS) ──────────────────────────────────────────────────
function downloadCallLogExcel(){
  // Load SheetJS if not already loaded
  function doExport(){
    var wb=XLSX.utils.book_new();
    // One sheet per provider
    PROVIDERS.forEach(function(prov){
      var students=(PROVIDER_MANDATES[prov]||[]).slice().sort();
      var rows=[['Student','Status','Note','Father Phone','Mother Phone','Best Contact','Preferred Time']];
      students.forEach(function(student){
        var entry=getCallEntry(prov,student);
        var opt=CALL_OPTS.find(function(o){return o.key===entry.status;});
        var contact=getStudentContact(student)||{};
        rows.push([
          student,
          opt?opt.label:'',
          entry.note||'',
          contact.father||'',
          contact.mother||'',
          contact.bestContact||'',
          contact.preferredTime||''
        ]);
      });
      var ws=XLSX.utils.aoa_to_sheet(rows);
      // Auto column widths
      ws['!cols']=[{wch:28},{wch:16},{wch:32},{wch:16},{wch:16},{wch:18},{wch:28}];
      var sheetName=prov.replace(/[:\\\/\?\*\[\]]/g,'').substring(0,31);
      XLSX.utils.book_append_sheet(wb,ws,sheetName);
    });
    XLSX.writeFile(wb,'CallLog_AllProviders.xlsx');
  }
  if(typeof XLSX!=='undefined'){
    doExport();
  } else {
    var s=document.createElement('script');
    s.src='https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
    s.onload=doExport;
    document.head.appendChild(s);
  }
}

function downloadProviderCallLogExcel(provider){
  function doExport(){
    var wb=XLSX.utils.book_new();
    var students=(PROVIDER_MANDATES[provider]||[]).slice().sort();
    var rows=[['Student','Status','Note','Father Phone','Mother Phone','Best Contact','Preferred Time']];
    students.forEach(function(student){
      var entry=getCallEntry(provider,student);
      var opt=CALL_OPTS.find(function(o){return o.key===entry.status;});
      var contact=getStudentContact(student)||{};
      rows.push([student,opt?opt.label:'',entry.note||'',contact.father||'',contact.mother||'',contact.bestContact||'',contact.preferredTime||'']);
    });
    var ws=XLSX.utils.aoa_to_sheet(rows);
    ws['!cols']=[{wch:28},{wch:16},{wch:32},{wch:16},{wch:16},{wch:18},{wch:28}];
    var sheetName=provider.replace(/[:\\\/\?\*\[\]]/g,'').substring(0,31);
    XLSX.utils.book_append_sheet(wb,ws,sheetName);
    XLSX.writeFile(wb,'CallLog_'+provider.split(' - ')[0]+'.xlsx');
  }
  if(typeof XLSX!=='undefined'){doExport();}
  else{var s=document.createElement('script');s.src='https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';s.onload=doExport;document.head.appendChild(s);}
}
function adminSearch(){
  const query=(document.getElementById('adminStudentSearch').value||'').trim().toLowerCase();
  const results=document.getElementById('adminSearchResults'),wk=getWeekKey();
  if(query.length<2){results.innerHTML='<div class="no-data">Type at least 2 characters.</div>';return;}
  const useSb=Object.keys(sbCache).length>0 && sbCacheWeek===wk;
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
let sbCacheWeek = null; // which week_key sbCache was last loaded for

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
    sbCacheWeek = wk;
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
  html += '<button class="btn-download" id="btnDownloadDocx" onclick="downloadStudentExcel()" disabled>&#128202; Download Excel</button>';
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
  var useSb = Object.keys(sbCache).length > 0 && sbCacheWeek === getWeekKey();

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
  var useSb = Object.keys(sbCache).length > 0 && sbCacheWeek === getWeekKey();

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

function downloadStudentExcel(){
  if(!officeCurrentStudent) return;
  var name = officeCurrentStudent;

  var sessions = [];
  RAW.forEach(function(row){
    for(var c = 3; c < 3 + PROVIDERS.length; c++){
      var student = (row[c] || '').trim();
      if(student === name){
        sessions.push({provider:PROVIDERS[c-3], day:row[0], time:row[1]});
        break;
      }
    }
  });

  function csvCell(v){ return '"' + String(v).replace(/"/g,'""') + '"'; }

  var lines = [];
  lines.push(csvCell('Student Schedule — ' + name));
  lines.push(csvCell('Generated: ' + new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})));
  lines.push('');
  lines.push([csvCell('Day'), csvCell('Time'), csvCell('Provider')].join(','));
  sessions.forEach(function(s){
    lines.push([csvCell(s.day), csvCell(timeStr(s.time)), csvCell(s.provider)].join(','));
  });

  var csv = '﻿' + lines.join('\r\n'); // BOM for Excel UTF-8
  var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/[^a-zA-Z0-9]/g,'_') + '_Schedule.csv';
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
