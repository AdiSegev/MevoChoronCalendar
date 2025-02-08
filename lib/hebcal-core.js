/*! @hebcal/core v5.9.0, distributed under GPLv2 https://www.gnu.org/licenses/gpl-2.0.txt */
'use strict';

var hdate = require('@hebcal/hdate');
var noaa = require('@hebcal/noaa');
require('temporal-polyfill/global');

/** DO NOT EDIT THIS AUTO-GENERATED FILE! */
const version = '5.9.0';

var poAshkenazi = { "headers": { "plural-forms": "nplurals=2; plural=(n > 1);", "language": "en_CA@ashkenazi" }, "contexts": { "": { "Shabbat": ["Shabbos"], "Achrei Mot": ["Achrei Mos"], "Bechukotai": ["Bechukosai"], "Beha'alotcha": ["Beha’aloscha"], "Bereshit": ["Bereshis"], "Chukat": ["Chukas"], "Erev Shavuot": ["Erev Shavuos"], "Erev Sukkot": ["Erev Sukkos"], "Ki Tavo": ["Ki Savo"], "Ki Teitzei": ["Ki Seitzei"], "Ki Tisa": ["Ki Sisa"], "Matot": ["Matos"], "Purim Katan": ["Purim Koton"], "Shabbat Chazon": ["Shabbos Chazon"], "Shabbat HaChodesh": ["Shabbos HaChodesh"], "Shabbat HaGadol": ["Shabbos HaGadol"], "Shabbat Nachamu": ["Shabbos Nachamu"], "Shabbat Parah": ["Shabbos Parah"], "Shabbat Shekalim": ["Shabbos Shekalim"], "Shabbat Shuva": ["Shabbos Shuvah"], "Shabbat Zachor": ["Shabbos Zachor"], "Shavuot": ["Shavuos"], "Shavuot I": ["Shavuos I"], "Shavuot II": ["Shavuos II"], "Shemot": ["Shemos"], "Shmini Atzeret": ["Shmini Atzeres"], "Simchat Torah": ["Simchas Torah"], "Sukkot": ["Sukkos"], "Sukkot I": ["Sukkos I"], "Sukkot II": ["Sukkos II"], "Sukkot II (CH''M)": ["Sukkos II (CH’’M)"], "Sukkot III (CH''M)": ["Sukkos III (CH’’M)"], "Sukkot IV (CH''M)": ["Sukkos IV (CH’’M)"], "Sukkot V (CH''M)": ["Sukkos V (CH’’M)"], "Sukkot VI (CH''M)": ["Sukkos VI (CH’’M)"], "Sukkot VII (Hoshana Raba)": ["Sukkos VII (Hoshana Raba)"], "Ta'anit Bechorot": ["Ta’anis Bechoros"], "Ta'anit Esther": ["Ta’anis Esther"], "Toldot": ["Toldos"], "Vaetchanan": ["Vaeschanan"], "Yitro": ["Yisro"], "Vezot Haberakhah": ["Vezos Haberakhah"], "Parashat": ["Parshas"], "Leil Selichot": ["Leil Selichos"], "Shabbat Mevarchim Chodesh": ["Shabbos Mevorchim Chodesh"], "Shabbat Shirah": ["Shabbos Shirah"], "Asara B'Tevet": ["Asara B’Teves"], "Alot HaShachar": ["Alos HaShachar"], "Kriat Shema, sof zeman": ["Krias Shema, sof zman"], "Tefilah, sof zeman": ["Tefilah, sof zman"], "Kriat Shema, sof zeman (MGA)": ["Krias Shema, sof zman (MGA)"], "Tefilah, sof zeman (MGA)": ["Tefilah, sof zman (MGA)"], "Chatzot HaLailah": ["Chatzos HaLailah"], "Chatzot hayom": ["Chatzos"], "Tzeit HaKochavim": ["Tzeis HaKochavim"], "Birkat Hachamah": ["Birkas Hachamah"], "Shushan Purim Katan": ["Shushan Purim Koton"] } } };

var poHe = { "headers": { "plural-forms": "nplurals=2; plural=(n > 1);", "language": "he_IL" }, "contexts": { "": { "Shabbat": ["שַׁבָּת"], "Daf Yomi": ["דַף יוֹמִי"], "Parashat": ["פָּרָשַׁת"], "Achrei Mot": ["אַחֲרֵי מוֹת"], "Balak": ["בָּלָק"], "Bamidbar": ["בְּמִדְבַּר"], "Bechukotai": ["בְּחֻקֹּתַי"], "Beha'alotcha": ["בְּהַעֲלֹתְךָ"], "Behar": ["בְּהַר"], "Bereshit": ["בְּרֵאשִׁית"], "Beshalach": ["בְּשַׁלַּח"], "Bo": ["בֹּא"], "Chayei Sara": ["חַיֵּי שָֹרָה"], "Chukat": ["חֻקַּת"], "Devarim": ["דְּבָרִים"], "Eikev": ["עֵקֶב"], "Emor": ["אֱמוֹר"], "Ha'azinu": ["הַאֲזִינוּ"], "Kedoshim": ["קְדשִׁים"], "Ki Tavo": ["כִּי־תָבוֹא"], "Ki Teitzei": ["כִּי־תֵצֵא"], "Ki Tisa": ["כִּי תִשָּׂא"], "Korach": ["קוֹרַח"], "Lech-Lecha": ["לֶךְ־לְךָ"], "Masei": ["מַסְעֵי"], "Matot": ["מַּטּוֹת"], "Metzora": ["מְּצֹרָע"], "Miketz": ["מִקֵּץ"], "Mishpatim": ["מִּשְׁפָּטִים"], "Nasso": ["נָשׂא"], "Nitzavim": ["נִצָּבִים"], "Noach": ["נֹחַ"], "Pekudei": ["פְקוּדֵי"], "Pinchas": ["פִּינְחָס"], "Re'eh": ["רְאֵה"], "Sh'lach": ["שְׁלַח־לְךָ"], "Shemot": ["שְׁמוֹת"], "Shmini": ["שְּׁמִינִי"], "Shoftim": ["שׁוֹפְטִים"], "Tazria": ["תַזְרִיעַ"], "Terumah": ["תְּרוּמָה"], "Tetzaveh": ["תְּצַוֶּה"], "Toldot": ["תּוֹלְדוֹת"], "Tzav": ["צַו"], "Vaera": ["וָאֵרָא"], "Vaetchanan": ["וָאֶתְחַנַּן"], "Vayakhel": ["וַיַּקְהֵל"], "Vayechi": ["וַיְחִי"], "Vayeilech": ["וַיֵּלֶךְ"], "Vayera": ["וַיֵּרָא"], "Vayeshev": ["וַיֵּשֶׁב"], "Vayetzei": ["וַיֵּצֵא"], "Vayigash": ["וַיִּגַּשׁ"], "Vayikra": ["וַיִּקְרָא"], "Vayishlach": ["וַיִּשְׁלַח"], "Vezot Haberakhah": ["וְזֹאת הַבְּרָכָה"], "Yitro": ["יִתְרוֹ"], "Asara B'Tevet": ["עֲשָׂרָה בְּטֵבֵת"], "Candle lighting": ["הַדְלָקַת נֵרוֹת"], "Chanukah": ["חֲנוּכָּה"], "Chanukah: 1 Candle": ["חֲנוּכָּה: א׳ נֵר"], "Chanukah: 2 Candles": ["חֲנוּכָּה: ב׳ נֵרוֹת"], "Chanukah: 3 Candles": ["חֲנוּכָּה: ג׳ נֵרוֹת"], "Chanukah: 4 Candles": ["חֲנוּכָּה: ד׳ נֵרוֹת"], "Chanukah: 5 Candles": ["חֲנוּכָּה: ה׳ נֵרוֹת"], "Chanukah: 6 Candles": ["חֲנוּכָּה: ו׳ נֵרוֹת"], "Chanukah: 7 Candles": ["חֲנוּכָּה: ז׳ נֵרוֹת"], "Chanukah: 8 Candles": ["חֲנוּכָּה: ח׳ נֵרוֹת"], "Chanukah: 8th Day": ["חֲנוּכָּה: יוֹם ח׳"], "Days of the Omer": ["סְפִירַת הָעוֹמֶר"], "Omer": ["עוֹמֶר"], "day of the Omer": ["בָּעוֹמֶר"], "Erev Pesach": ["עֶרֶב פֶּסַח"], "Erev Purim": ["עֶרֶב פּוּרִים"], "Erev Rosh Hashana": ["עֶרֶב רֹאשׁ הַשָּׁנָה"], "Erev Shavuot": ["עֶרֶב שָׁבוּעוֹת"], "Erev Simchat Torah": ["עֶרֶב שִׂמְחַת תּוֹרָה"], "Erev Sukkot": ["עֶרֶב סוּכּוֹת"], "Erev Tish'a B'Av": ["עֶרֶב תִּשְׁעָה בְּאָב"], "Erev Yom Kippur": ["עֶרֶב יוֹם כִּפּוּר"], "Havdalah": ["הַבְדָּלָה"], "Lag BaOmer": ["ל״ג בָּעוֹמֶר"], "Leil Selichot": ["סליחות"], "Pesach": ["פֶּסַח"], "Pesach I": ["פֶּסַח א׳"], "Pesach II": ["פֶּסַח ב׳"], "Pesach II (CH''M)": ["פֶּסַח ב׳ (חוה״מ)"], "Pesach III (CH''M)": ["פֶּסַח ג׳ (חוה״מ)"], "Pesach IV (CH''M)": ["פֶּסַח ד׳ (חוה״מ)"], "Pesach Sheni": ["פֶּסַח שני"], "Pesach V (CH''M)": ["פֶּסַח ה׳ (חוה״מ)"], "Pesach VI (CH''M)": ["פֶּסַח ו׳ (חוה״מ)"], "Pesach VII": ["פֶּסַח ז׳"], "Pesach VIII": ["פֶּסַח ח׳"], "Purim": ["פּוּרִים"], "Purim Katan": ["פּוּרִים קָטָן"], "Rosh Chodesh %s": ["רֹאשׁ חוֹדֶשׁ %s"], "Rosh Chodesh": ["רֹאשׁ חוֹדֶשׁ"], "Rosh Hashana": ["רֹאשׁ הַשָּׁנָה"], "Rosh Hashana I": ["רֹאשׁ הַשָּׁנָה א׳"], "Rosh Hashana II": ["רֹאשׁ הַשָּׁנָה ב׳"], "Shabbat Chazon": ["שַׁבָּת חֲזוֹן"], "Shabbat HaChodesh": ["שַׁבָּת הַחֹדֶשׁ"], "Shabbat HaGadol": ["שַׁבָּת הַגָּדוֹל"], "Shabbat Nachamu": ["שַׁבָּת נַחֲמוּ"], "Shabbat Parah": ["שַׁבָּת פּרה"], "Shabbat Shekalim": ["שַׁבָּת שְׁקָלִים"], "Shabbat Shuva": ["שַׁבָּת שׁוּבָה"], "Shabbat Zachor": ["שַׁבָּת זָכוֹר"], "Shavuot": ["שָׁבוּעוֹת"], "Shavuot I": ["שָׁבוּעוֹת א׳"], "Shavuot II": ["שָׁבוּעוֹת ב׳"], "Shmini Atzeret": ["שְׁמִינִי עֲצֶרֶת"], "Shushan Purim": ["שׁוּשָׁן פּוּרִים"], "Sigd": ["סיגד"], "Simchat Torah": ["שִׂמְחַת תּוֹרָה"], "Sukkot": ["סוּכּוֹת"], "Sukkot I": ["סוּכּוֹת א׳"], "Sukkot II": ["סוּכּוֹת ב׳"], "Sukkot II (CH''M)": ["סוּכּוֹת ב׳ (חוה״מ)"], "Sukkot III (CH''M)": ["סוּכּוֹת ג׳ (חוה״מ)"], "Sukkot IV (CH''M)": ["סוּכּוֹת ד׳ (חוה״מ)"], "Sukkot V (CH''M)": ["סוּכּוֹת ה׳ (חוה״מ)"], "Sukkot VI (CH''M)": ["סוּכּוֹת ו׳ (חוה״מ)"], "Sukkot VII (Hoshana Raba)": ["סוּכּוֹת ז׳ (הוֹשַׁעְנָא רַבָּה)"], "Ta'anit Bechorot": ["תַּעֲנִית בְּכוֹרוֹת"], "Ta'anit Esther": ["תַּעֲנִית אֶסְתֵּר"], "Tish'a B'Av": ["תִּשְׁעָה בְּאָב"], "Tu B'Av": ["טוּ בְּאָב"], "Tu BiShvat": ["טוּ בִּשְׁבָט"], "Tu B'Shvat": ["טוּ בִּשְׁבָט"], "Tzom Gedaliah": ["צוֹם גְּדַלְיָה"], "Tzom Tammuz": ["צוֹם תָּמוּז"], "Yom HaAtzma'ut": ["יוֹם הָעַצְמָאוּת"], "Yom HaShoah": ["יוֹם הַשּׁוֹאָה"], "Yom HaZikaron": ["יוֹם הַזִּכָּרוֹן"], "Yom Kippur": ["יוֹם כִּפּוּר"], "Yom Yerushalayim": ["יוֹם יְרוּשָׁלַיִם"], "Yom HaAliyah": ["יוֹם הַעֲלִיָּה"], "Yom HaAliyah School Observance": ["שְׁמִירָת בֵּית הַסֵפֶר לְיוֹם הַעֲלִיָּה"], "Rosh Chodesh Adar": ["רֹאשׁ חוֹדֶשׁ אַדָר"], "Rosh Chodesh Adar I": ["רֹאשׁ חוֹדֶשׁ אַדָר א׳"], "Rosh Chodesh Adar II": ["רֹאשׁ חוֹדֶשׁ אַדָר ב׳"], "Rosh Chodesh Av": ["רֹאשׁ חוֹדֶשׁ אָב"], "Rosh Chodesh Cheshvan": ["רֹאשׁ חוֹדֶשׁ חֶשְׁוָן"], "Rosh Chodesh Elul": ["רֹאשׁ חוֹדֶשׁ אֱלוּל"], "Rosh Chodesh Iyyar": ["רֹאשׁ חוֹדֶשׁ אִיָיר"], "Rosh Chodesh Kislev": ["רֹאשׁ חוֹדֶשׁ כִּסְלֵו"], "Rosh Chodesh Nisan": ["רֹאשׁ חוֹדֶשׁ נִיסָן"], "Rosh Chodesh Sh'vat": ["רֹאשׁ חוֹדֶשׁ שְׁבָט"], "Rosh Chodesh Sivan": ["רֹאשׁ חוֹדֶשׁ סִיוָן"], "Rosh Chodesh Tamuz": ["רֹאשׁ חוֹדֶשׁ תָּמוּז"], "Rosh Chodesh Tevet": ["רֹאשׁ חוֹדֶשׁ טֵבֵת"], "min": ["דַּקּוֹת"], "Fast begins": ["תחילת הַצוֹם"], "Fast ends": ["סִיּוּם הַצוֹם"], "Rosh Hashana LaBehemot": ["רֹאשׁ הַשָּׁנָה לְמַעְשַׂר בְּהֵמָה"], "Tish'a B'Av (observed)": ["תִּשְׁעָה בְּאָב נִדחֶה"], "Shabbat Mevarchim Chodesh": ["שַׁבָּת מְבָרְכִים חוֹדֶשׁ"], "Shabbat Shirah": ["שַׁבָּת שִׁירָה"], "Chatzot HaLailah": ["חֲצוֹת הַלַיְלָה"], "Alot haShachar": ["עֲלוֹת הַשַּׁחַר"], "Misheyakir": ["מִשֶּׁיַּכִּיר"], "Misheyakir Machmir": ["מִשֶּׁיַּכִּיר מַחמִיר"], "Dawn": ["דִּימְדּוּמֵי בּוֹקֵר"], "Sunrise": ["הַנֵץ הַחַמָּה"], "Kriat Shema, sof zeman": ["סוֹף זְמַן קְרִיאַת שְׁמַע גר״א"], "Tefilah, sof zeman": ["סוֹף זְמַן תְּפִלָּה גר״א"], "Kriat Shema, sof zeman (MGA)": ["סוֹף זְמַן קְרִיאַת שְׁמַע מג״א"], "Tefilah, sof zeman (MGA)": ["סוֹף זְמַן תְּפִלָּה מג״א"], "Chatzot hayom": ["חֲצוֹת הַיּוֹם"], "Mincha Gedolah": ["מִנְחָה גְּדוֹלָה"], "Mincha Ketanah": ["מִנְחָה קְטַנָּה"], "Plag HaMincha": ["פְּלַג הַמִּנְחָה"], "Dusk": ["דִּימְדּוּמֵי עֶרֶב"], "Sunset": ["שְׁקִיעָה"], "Nightfall - End of ordained fasts": ["לַיְלָה - גמר תעניות דרבנן"], "Tzeit HaKochavim": ["צֵאת הַכּוֹכָבִים"], "Lovingkindness": ["חֶֽסֶד"], "Might": ["גְבוּרָה"], "Beauty": ["תִּפאֶרֶת"], "Eternity": ["נֶּֽצַח"], "Splendor": ["הוֹד"], "Foundation": ["יְּסוֹד"], "Majesty": ["מַּלְכוּת"], "day": ["יוֹם"], "Yom Kippur Katan": ["יוֹם כִּפּוּר קָטָן"], "Yizkor": ["יִזְכּוֹר"], "Family Day": ["יוֹם הַמִּשׁפָּחָה"], "Yitzhak Rabin Memorial Day": ["יוֹם הַזִּכָּרוֹן ליצחק רבין"], "Jabotinsky Day": ["יוֹם ז׳בוטינסקי"], "Herzl Day": ["יוֹם הרצל"], "Ben-Gurion Day": ["יוֹם בן־גוריון"], "Hebrew Language Day": ["יוֹם הַשָׂפָה הַעִברִית"], "Birkat Hachamah": ["בִרְכַּת הַחַמָּה"], "Shushan Purim Katan": ["שׁוּשָׁן פּוּרִים קָטָן"], "Purim Meshulash": ["פּוּרִים מְשׁוּלָּשׁ"], "after sunset": ["לְאַחַר הַשְׁקִיעָה"], "Yerushalmi": ["יְרוּשַׁלְמִי"], "Chag HaBanot": ["חַג הַבָּנוֹת"], "Joshua": ["יְהוֹשׁוּעַ"], "Judges": ["שׁוֹפְטִים"], "I Samuel": ["שְׁמוּאֵל רִאשׁוֹן"], "II Samuel": ["שְׁמוּאֵל שֵׁנִי"], "I Kings": ["מְלָכִים רִאשׁוֹן"], "II Kings": ["מְלָכִים שֵׁנִי"], "Isaiah": ["יְשַׁעְיָהוּ"], "Jeremiah": ["יִרְמְיָהוּ"], "Ezekiel": ["יְחֶזְקֵאל"], "Hosea": ["הוֹשֵׁעַ"], "Joel": ["יוֹאֵל"], "Amos": ["עָמוּס"], "Obadiah": ["עוֹבַדְיָה"], "Jonah": ["יוֹנָה"], "Micah": ["מִיכָה"], "Nachum": ["נַחוּם"], "Habakkuk": ["חֲבַקּוּק"], "Zephaniah": ["צְפַנְיָה"], "Haggai": ["חַגַּי"], "Zechariah": ["זְכַרְיָה"], "Malachi": ["מַלְאָכִי"], "Psalms": ["תְּהִלִּים"], "Proverbs": ["מִשְׁלֵי"], "Job": ["אִיּוֹב"], "Song of Songs": ["שִׁיר הַשִּׁירִים"], "Ruth": ["רוּת"], "Lamentations": ["אֵיכָה"], "Ecclesiastes": ["קֹהֶלֶת"], "Esther": ["אֶסְתֵּר"], "Daniel": ["דָּנִיֵּאל"], "Ezra": ["עֶזְרָא"], "Nehemiah": ["נְחֶמְיָה"], "I Chronicles": ["דִברֵי הַיָמִים רִאשׁוֹן"], "II Chronicles": ["דִברֵי הַיָמִים שֵׁנִי"], "Molad": ["מוֹלָד הָלְּבָנָה"], "chalakim": ["חֲלָקִים"], "Pirkei Avot": ["פִּרְקֵי אָבוֹת"] } } };

hdate.Locale.addTranslations('he', poHe);
hdate.Locale.addTranslations('h', poHe);
hdate.Locale.addTranslations('ashkenazi', poAshkenazi);
hdate.Locale.addTranslations('a', poAshkenazi);
/* Hebrew without nikkud */
const heStrs = poHe.contexts[''];
const heNoNikud = {};
for (const [key, val] of Object.entries(heStrs)) {
    heNoNikud[key] = [hdate.Locale.hebrewStripNikkud(val[0])];
}
const poHeNoNikud = {
    headers: poHe.headers,
    contexts: { '': heNoNikud },
};
hdate.Locale.addTranslations('he-x-NoNikud', poHeNoNikud);

/**
 * Holiday flags for Event. These flags are typically
 * combined using bitwise arithmetic to form a mask.
 * @readonly
 * @enum {number}
 */
const flags = {
    /** Chag, yontiff, yom tov */
    CHAG: 0x000001,
    /** Light candles 18 minutes before sundown */
    LIGHT_CANDLES: 0x000002,
    /** End of holiday (end of Yom Tov)  */
    YOM_TOV_ENDS: 0x000004,
    /** Observed only in the Diaspora (chutz l'aretz)  */
    CHUL_ONLY: 0x000008,
    /** Observed only in Israel */
    IL_ONLY: 0x000010,
    /** Light candles in the evening at Tzeit time (3 small stars) */
    LIGHT_CANDLES_TZEIS: 0x000020,
    /** Candle-lighting for Chanukah */
    CHANUKAH_CANDLES: 0x000040,
    /** Rosh Chodesh, beginning of a new Hebrew month */
    ROSH_CHODESH: 0x000080,
    /** Minor fasts like Tzom Tammuz, Ta'anit Esther, ... */
    MINOR_FAST: 0x000100,
    /** Shabbat Shekalim, Zachor, ... */
    SPECIAL_SHABBAT: 0x000200,
    /** Weekly sedrot on Saturdays */
    PARSHA_HASHAVUA: 0x000400,
    /** Daily page of Talmud (Bavli) */
    DAF_YOMI: 0x000800,
    /** Days of the Omer */
    OMER_COUNT: 0x001000,
    /** Yom HaShoah, Yom HaAtzma'ut, ... */
    MODERN_HOLIDAY: 0x002000,
    /** Yom Kippur and Tish'a B'Av */
    MAJOR_FAST: 0x004000,
    /** On the Saturday before Rosh Chodesh */
    SHABBAT_MEVARCHIM: 0x008000,
    /** Molad */
    MOLAD: 0x010000,
    /** Yahrzeit or Hebrew Anniversary */
    USER_EVENT: 0x020000,
    /** Daily Hebrew date ("11th of Sivan, 5780") */
    HEBREW_DATE: 0x040000,
    /** A holiday that's not major, modern, rosh chodesh, or a fast day */
    MINOR_HOLIDAY: 0x080000,
    /** Evening before a major or minor holiday */
    EREV: 0x100000,
    /** Chol haMoed, intermediate days of Pesach or Sukkot */
    CHOL_HAMOED: 0x200000,
    /** Mishna Yomi */
    MISHNA_YOMI: 0x400000,
    /** Yom Kippur Katan, minor day of atonement on the day preceeding each Rosh Chodesh */
    YOM_KIPPUR_KATAN: 0x800000,
    /** Daily page of Jerusalem Talmud (Yerushalmi) */
    YERUSHALMI_YOMI: 0x1000000,
    /** Nach Yomi */
    NACH_YOMI: 0x2000000,
    /** Daily Learning */
    DAILY_LEARNING: 0x4000000,
    /** Yizkor */
    YIZKOR: 0x8000000,
};
const flagToCategory = [
    [flags.MAJOR_FAST, 'holiday', 'major', 'fast'],
    [flags.CHANUKAH_CANDLES, 'holiday', 'major'],
    [flags.HEBREW_DATE, 'hebdate'],
    [flags.MINOR_FAST, 'holiday', 'fast'],
    [flags.MINOR_HOLIDAY, 'holiday', 'minor'],
    [flags.MODERN_HOLIDAY, 'holiday', 'modern'],
    [flags.MOLAD, 'molad'],
    [flags.OMER_COUNT, 'omer'],
    [flags.PARSHA_HASHAVUA, 'parashat'], // backwards-compat
    [flags.ROSH_CHODESH, 'roshchodesh'],
    [flags.SHABBAT_MEVARCHIM, 'mevarchim'],
    [flags.SPECIAL_SHABBAT, 'holiday', 'shabbat'],
    [flags.USER_EVENT, 'user'],
    [flags.YIZKOR, 'yizkor'],
];
/**
 * Represents an Event with a title, date, and flags.
 *
 * Events are used to represent holidays, candle-lighting times,
 * Torah readings, and more.
 *
 * To get the title of the event a language other than English
 * with Sephardic transliterations, use the `render()` method.
 */
class Event {
    /**
     * Constructs Event
     * @param date Hebrew date event occurs
     * @param desc Description (not translated)
     * @param [mask=0] optional bitmask of holiday flags (see {@link flags})
     * @param [attrs={}] optional additional attributes (e.g. `eventTimeStr`, `cholHaMoedDay`)
     */
    constructor(date, desc, mask = 0, attrs) {
        if (!hdate.HDate.isHDate(date)) {
            throw new TypeError(`Invalid Event date: ${date}`);
        }
        else if (typeof desc !== 'string') {
            throw new TypeError(`Invalid Event description: ${desc}`);
        }
        this.date = date;
        this.desc = desc;
        this.mask = +mask;
        if (typeof attrs === 'object' && attrs !== null) {
            Object.assign(this, attrs);
        }
    }
    /**
     * Hebrew date of this event
     */
    getDate() {
        return this.date;
    }
    /**
     * Untranslated title of this event. Note that these description
     * strings are always in English and will remain stable across releases.
     * To get the title of the event in another language, use the
     * `render()` method.
     */
    getDesc() {
        return this.desc;
    }
    /**
     * Bitmask of optional event flags. See {@link flags}
     */
    getFlags() {
        return this.mask;
    }
    /**
     * Returns (translated) description of this event
     * @example
     * const ev = new Event(new HDate(6, 'Sivan', 5749), 'Shavuot', flags.CHAG);
     * ev.render('en'); // 'Shavuot'
     * ev.render('he'); // 'שָׁבוּעוֹת'
     * ev.render('ashkenazi'); // 'Shavuos'
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        return hdate.Locale.gettext(this.desc, locale);
    }
    /**
     * Returns a brief (translated) description of this event.
     * For most events, this is the same as render(). For some events, it procudes
     * a shorter text (e.g. without a time or added description).
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        return this.render(locale);
    }
    /**
     * Optional holiday-specific Emoji or `null`.
     */
    getEmoji() {
        return this.emoji || null;
    }
    /**
     * Returns a simplified (untranslated) description for this event. For example,
     * the `HolidayEvent` class supports
     * "Erev Pesach" => "Pesach", and "Sukkot III (CH''M)" => "Sukkot".
     * For many holidays the basename and the event description are the same.
     */
    basename() {
        return this.getDesc();
    }
    /**
     * Returns a URL to hebcal.com or sefaria.org for more detail on the event.
     * Returns `undefined` for events with no detail page.
     */
    url() {
        return undefined;
    }
    /**
     * Is this event observed in Israel?
     * @example
     * const ev1 = new Event(new HDate(7, 'Sivan', 5749), 'Shavuot II', flags.CHAG | flags.CHUL_ONLY);
     * ev1.observedInIsrael(); // false
     * const ev2 = new Event(new HDate(26, 'Kislev', 5749), 'Chanukah: 3 Candles', 0);
     * ev2.observedInIsrael(); // true
     */
    observedInIsrael() {
        return !(this.mask & flags.CHUL_ONLY);
    }
    /**
     * Is this event observed in the Diaspora?
     * @example
     * const ev1 = new Event(new HDate(7, 'Sivan', 5749), 'Shavuot II', flags.CHAG | flags.CHUL_ONLY);
     * ev1.observedInDiaspora(); // true
     * const ev2 = new Event(new HDate(26, 'Kislev', 5749), 'Chanukah: 3 Candles', 0);
     * ev2.observedInDiaspora(); // true
     */
    observedInDiaspora() {
        return !(this.mask & flags.IL_ONLY);
    }
    /**
     * Is this event observed in Israel/Diaspora?
     * @example
     * const ev1 = new Event(new HDate(7, 'Sivan', 5749), 'Shavuot II', flags.CHAG | flags.CHUL_ONLY);
     * ev1.observedIn(false); // true
     * ev1.observedIn(true); // false
     * const ev2 = new Event(new HDate(26, 'Kislev', 5749), 'Chanukah: 3 Candles', 0);
     * ev2.observedIn(false); // true
     * ev2.observedIn(true); // true
     * @param il
     */
    observedIn(il) {
        return il ? this.observedInIsrael() : this.observedInDiaspora();
    }
    /**
     * Makes a clone of this Event object
     * @deprecated
     */
    clone() {
        const ev = new Event(this.date, this.desc, this.mask);
        // overwrite all enumerable properties
        Object.assign(ev, this);
        return ev;
    }
    /**
     * Returns a list of event categories
     */
    getCategories() {
        const mask = this.getFlags();
        for (const attrs of flagToCategory) {
            const attr0 = attrs[0];
            if (mask & attr0) {
                return attrs.slice(1);
            }
        }
        return ['unknown'];
    }
}

/** Daily Hebrew date ("11th of Sivan, 5780") */
class HebrewDateEvent extends Event {
    /**
     * @param date
     */
    constructor(date) {
        super(date, date.toString(), flags.HEBREW_DATE);
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     * @example
     * import {HDate, HebrewDateEvent, months} from '@hebcal/core';
     *
     * const hd = new HDate(15, months.CHESHVAN, 5769);
     * const ev = new HebrewDateEvent(hd);
     * console.log(ev.render('en')); // '15th of Cheshvan, 5769'
     * console.log(ev.render('he')); // 'ט״ו חֶשְׁוָן תשס״ט'
     */
    render(locale) {
        const locale1 = locale === null || locale === undefined ? undefined : locale.toLowerCase();
        const locale0 = locale1 !== null && locale1 !== undefined ? locale1 : hdate.Locale.getLocaleName();
        const hd = this.getDate();
        switch (locale0) {
            case 'h':
            case 'he':
                return hd.renderGematriya(false);
            case 'he-x-nonikud':
                return hd.renderGematriya(true);
            default:
                return hd.render(locale0, true);
        }
    }
    /**
     * @private
     * @param locale
     */
    renderBriefHebrew(locale) {
        const hd = this.getDate();
        const dd = hd.getDate();
        const mm = hdate.Locale.gettext(hd.getMonthName(), locale);
        return hdate.gematriya(dd) + ' ' + mm;
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     * @example
     * import {HDate, HebrewDateEvent, months} from '@hebcal/core';
     *
     * const hd = new HDate(15, months.CHESHVAN, 5769);
     * const ev = new HebrewDateEvent(hd);
     * console.log(ev.renderBrief()); // '15th of Cheshvan'
     * console.log(ev.renderBrief('he')); // 'ט״ו חֶשְׁוָן'
     */
    renderBrief(locale) {
        const locale1 = locale === null || locale === undefined ? undefined : locale.toLowerCase();
        const locale0 = locale1 !== null && locale1 !== undefined ? locale1 : hdate.Locale.getLocaleName();
        const hd = this.getDate();
        if (hd.getMonth() === hdate.months.TISHREI && hd.getDate() === 1) {
            return this.render(locale0);
        }
        switch (locale0) {
            case 'h':
            case 'he':
            case 'he-x-nonikud':
                return this.renderBriefHebrew(locale0);
            default:
                return hd.render(locale0, false);
        }
    }
}

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
const classicCities0 = [
    ['Ashdod', 'IL', 31.79213, 34.64966, 'Asia/Jerusalem', 27],
    ['Atlanta', 'US', 33.749, -84.38798, 'America/New_York', 336],
    ['Austin', 'US', 30.26715, -97.74306, 'America/Chicago', 165],
    ['Baghdad', 'IQ', 33.34058, 44.40088, 'Asia/Baghdad', 41],
    ['Beer Sheva', 'IL', 31.25181, 34.7913, 'Asia/Jerusalem', 285],
    ['Berlin', 'DE', 52.52437, 13.41053, 'Europe/Berlin', 43],
    ['Baltimore', 'US', 39.29038, -76.61219, 'America/New_York', 35],
    ['Bogota', 'CO', 4.60971, -74.08175, 'America/Bogota', 2582],
    ['Boston', 'US', 42.35843, -71.05977, 'America/New_York', 38],
    ['Budapest', 'HU', 47.49801, 19.03991, 'Europe/Budapest', 104],
    [
        'Buenos Aires',
        'AR',
        -34.61315,
        -58.37723,
        'America/Argentina/Buenos_Aires',
        31,
    ],
    ['Buffalo', 'US', 42.88645, -78.87837, 'America/New_York', 191],
    ['Chicago', 'US', 41.85003, -87.65005, 'America/Chicago', 180],
    ['Cincinnati', 'US', 39.162, -84.45689, 'America/New_York', 267],
    ['Cleveland', 'US', 41.4995, -81.69541, 'America/New_York', 204],
    ['Dallas', 'US', 32.78306, -96.80667, 'America/Chicago', 139],
    ['Denver', 'US', 39.73915, -104.9847, 'America/Denver', 1636],
    ['Detroit', 'US', 42.33143, -83.04575, 'America/Detroit', 192],
    ['Eilat', 'IL', 29.55805, 34.94821, 'Asia/Jerusalem', 63],
    ['Gibraltar', 'GI', 36.14474, -5.35257, 'Europe/Gibraltar', 11],
    ['Haifa', 'IL', 32.81841, 34.9885, 'Asia/Jerusalem', 40],
    ['Hawaii', 'US', 21.30694, -157.85833, 'Pacific/Honolulu', 18],
    ['Helsinki', 'FI', 60.16952, 24.93545, 'Europe/Helsinki', 26],
    ['Houston', 'US', 29.76328, -95.36327, 'America/Chicago', 30],
    ['Jerusalem', 'IL', 31.76904, 35.21633, 'Asia/Jerusalem', 786],
    ['Johannesburg', 'ZA', -26.20227, 28.04363, 'Africa/Johannesburg', 1767],
    ['Kiev', 'UA', 50.45466, 30.5238, 'Europe/Kiev', 187],
    ['La Paz', 'BO', -16.5, -68.15, 'America/La_Paz', 3782],
    ['Livingston', 'US', 40.79593, -74.31487, 'America/New_York', 98],
    ['Las Vegas', 'US', 36.17497, -115.13722, 'America/Los_Angeles', 613],
    ['London', 'GB', 51.50853, -0.12574, 'Europe/London', 25],
    ['Los Angeles', 'US', 34.05223, -118.24368, 'America/Los_Angeles', 96],
    ['Marseilles', 'FR', 43.29695, 5.38107, 'Europe/Paris', 28],
    ['Miami', 'US', 25.77427, -80.19366, 'America/New_York', 25],
    ['Minneapolis', 'US', 44.97997, -93.26384, 'America/Chicago', 262],
    ['Melbourne', 'AU', -37.814, 144.96332, 'Australia/Melbourne', 25],
    ['Mexico City', 'MX', 19.42847, -99.12766, 'America/Mexico_City', 2240],
    ['Montreal', 'CA', 45.50884, -73.58781, 'America/Toronto', 216],
    ['Moscow', 'RU', 55.75222, 37.61556, 'Europe/Moscow', 144],
    ['New York', 'US', 40.71427, -74.00597, 'America/New_York', 57],
    ['Omaha', 'US', 41.25861, -95.93779, 'America/Chicago', 315],
    ['Ottawa', 'CA', 45.41117, -75.69812, 'America/Toronto', 71],
    ['Panama City', 'PA', 8.9936, -79.51973, 'America/Panama', 17],
    ['Paris', 'FR', 48.85341, 2.3488, 'Europe/Paris', 42],
    ['Pawtucket', 'US', 41.87871, -71.38256, 'America/New_York', 0], // -11
    ['Petach Tikvah', 'IL', 32.08707, 34.88747, 'Asia/Jerusalem', 54],
    ['Philadelphia', 'US', 39.95233, -75.16379, 'America/New_York', 8],
    ['Phoenix', 'US', 33.44838, -112.07404, 'America/Phoenix', 366],
    ['Pittsburgh', 'US', 40.44062, -79.99589, 'America/New_York', 239],
    ['Providence', 'US', 41.82399, -71.41283, 'America/New_York', 0], // -15
    ['Portland', 'US', 45.52345, -122.67621, 'America/Los_Angeles', 15],
    ['Saint Louis', 'US', 38.62727, -90.19789, 'America/Chicago', 149],
    ['Saint Petersburg', 'RU', 59.93863, 30.31413, 'Europe/Moscow', 11],
    ['San Diego', 'US', 32.71533, -117.15726, 'America/Los_Angeles', 20],
    ['San Francisco', 'US', 37.77493, -122.41942, 'America/Los_Angeles', 28],
    ['Sao Paulo', 'BR', -23.5475, -46.63611, 'America/Sao_Paulo', 769],
    ['Seattle', 'US', 47.60621, -122.33207, 'America/Los_Angeles', 56],
    ['Sydney', 'AU', -33.86785, 151.20732, 'Australia/Sydney', 58],
    ['Tel Aviv', 'IL', 32.08088, 34.78057, 'Asia/Jerusalem', 15],
    ['Tiberias', 'IL', 32.79221, 35.53124, 'Asia/Jerusalem', 0], // -140
    ['Toronto', 'CA', 43.70011, -79.4163, 'America/Toronto', 175],
    ['Vancouver', 'CA', 49.24966, -123.11934, 'America/Vancouver', 70],
    ['White Plains', 'US', 41.03399, -73.76291, 'America/New_York', 82],
    ['Washington DC', 'US', 38.89511, -77.03637, 'America/New_York', 6],
    ['Worcester', 'US', 42.26259, -71.80229, 'America/New_York', 164],
];
const classicCities = new Map();
// Zip-Codes.com TimeZone IDs
const ZIPCODES_TZ_MAP = {
    '0': 'UTC',
    '4': 'America/Puerto_Rico', // Atlantic (GMT -04:00)
    '5': 'America/New_York', //    Eastern  (GMT -05:00)
    '6': 'America/Chicago', //     Central  (GMT -06:00)
    '7': 'America/Denver', //      Mountain (GMT -07:00)
    '8': 'America/Los_Angeles', // Pacific  (GMT -08:00)
    '9': 'America/Anchorage', //   Alaska   (GMT -09:00)
    '10': 'Pacific/Honolulu', //   Hawaii-Aleutian Islands (GMT -10:00)
    '11': 'Pacific/Pago_Pago', //  American Samoa (GMT -11:00)
    '13': 'Pacific/Funafuti', //   Marshall Islands (GMT +12:00)
    '14': 'Pacific/Guam', //       Guam     (GMT +10:00)
    '15': 'Pacific/Palau', //      Palau    (GMT +9:00)
    '16': 'Pacific/Chuuk', //      Micronesia (GMT +11:00)
};
/** @private */
const timeFormatCache = new Map();
/**
 * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) from cache
 * or makes a new one if needed
 * @private
 */
function getFormatter(tzid) {
    const fmt = timeFormatCache.get(tzid);
    if (fmt)
        return fmt;
    const f = new Intl.DateTimeFormat('en-US', {
        timeZone: tzid,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    timeFormatCache.set(tzid, f);
    return f;
}
/** Class representing Location */
class Location extends noaa.GeoLocation {
    /**
     * Initialize a Location instance
     * @param latitude - Latitude as a decimal, valid range -90 thru +90 (e.g. 41.85003)
     * @param longitude - Longitude as a decimal, valid range -180 thru +180 (e.g. -87.65005)
     * @param il - in Israel (true) or Diaspora (false)
     * @param tzid - Olson timezone ID, e.g. "America/Chicago"
     * @param [cityName] - optional descriptive city name
     * @param [countryCode] - ISO 3166 alpha-2 country code (e.g. "FR")
     * @param [geoid] - optional string or numeric geographic ID
     * @param [elevation] - in meters (default `0`)
     */
    constructor(latitude, longitude, il, tzid, cityName, countryCode, geoid, elevation) {
        const lat = typeof latitude === 'number' ? latitude : parseFloat(latitude);
        if (isNaN(lat) || lat < -90 || lat > 90) {
            throw new RangeError(`Latitude ${latitude} out of range [-90,90]`);
        }
        const long = typeof longitude === 'number' ? longitude : parseFloat(longitude);
        if (isNaN(long) || long < -180 || long > 180) {
            throw new RangeError(`Longitude ${longitude} out of range [-180,180]`);
        }
        const elev = typeof elevation === 'number' && elevation > 0 ? elevation : 0;
        super(cityName || null, lat, long, elev, tzid);
        this.il = Boolean(il);
        this.cc = countryCode;
        this.geoid = geoid;
    }
    getIsrael() {
        return this.il;
    }
    getName() {
        return this.getLocationName();
    }
    /**
     * Returns the location name, up to the first comma
     */
    getShortName() {
        const name = this.getLocationName();
        if (!name)
            return name;
        const comma = name.indexOf(', ');
        if (comma === -1)
            return name;
        if (this.cc === 'US' && name[comma + 2] === 'D') {
            if (name[comma + 3] === 'C') {
                return name.substring(0, comma + 4);
            }
            else if (name[comma + 3] === '.' && name[comma + 4] === 'C') {
                return name.substring(0, comma + 6);
            }
        }
        return name.substring(0, comma);
    }
    getCountryCode() {
        return this.cc;
    }
    getTzid() {
        return this.getTimeZone();
    }
    /**
     * Gets a 24-hour time formatter (e.g. 07:41 or 20:03) for this location
     */
    getTimeFormatter() {
        return getFormatter(this.getTimeZone());
    }
    getGeoId() {
        return this.geoid;
    }
    /**
     * Creates a location object from one of 60 "classic" Hebcal city names.
     * The following city names are supported:
     * 'Ashdod', 'Atlanta', 'Austin', 'Baghdad', 'Beer Sheva',
     * 'Berlin', 'Baltimore', 'Bogota', 'Boston', 'Budapest',
     * 'Buenos Aires', 'Buffalo', 'Chicago', 'Cincinnati', 'Cleveland',
     * 'Dallas', 'Denver', 'Detroit', 'Eilat', 'Gibraltar', 'Haifa',
     * 'Hawaii', 'Helsinki', 'Houston', 'Jerusalem', 'Johannesburg',
     * 'Kiev', 'La Paz', 'Livingston', 'Las Vegas', 'London', 'Los Angeles',
     * 'Marseilles', 'Miami', 'Minneapolis', 'Melbourne', 'Mexico City',
     * 'Montreal', 'Moscow', 'New York', 'Omaha', 'Ottawa', 'Panama City',
     * 'Paris', 'Pawtucket', 'Petach Tikvah', 'Philadelphia', 'Phoenix',
     * 'Pittsburgh', 'Providence', 'Portland', 'Saint Louis', 'Saint Petersburg',
     * 'San Diego', 'San Francisco', 'Sao Paulo', 'Seattle', 'Sydney',
     * 'Tel Aviv', 'Tiberias', 'Toronto', 'Vancouver', 'White Plains',
     * 'Washington DC', 'Worcester'
     * @param name
     */
    static lookup(name) {
        return classicCities.get(name.toLowerCase());
    }
    toString() {
        return JSON.stringify(this);
    }
    /**
     * Converts legacy Hebcal timezone to a standard Olson tzid.
     * @param tz integer, GMT offset in hours
     * @param dst 'none', 'eu', 'usa', or 'israel'
     */
    static legacyTzToTzid(tz, dst) {
        tz = +tz;
        if (dst === 'none') {
            if (tz === 0) {
                return 'UTC';
            }
            else {
                const plus = tz > 0 ? '+' : '';
                return `Etc/GMT${plus}${tz}`;
            }
        }
        else if (tz === 2 && dst === 'israel') {
            return 'Asia/Jerusalem';
        }
        else if (dst === 'eu') {
            switch (tz) {
                case -2:
                    return 'Atlantic/Cape_Verde';
                case -1:
                    return 'Atlantic/Azores';
                case 0:
                    return 'Europe/London';
                case 1:
                    return 'Europe/Paris';
                case 2:
                    return 'Europe/Athens';
            }
        }
        else if (dst === 'usa') {
            return ZIPCODES_TZ_MAP[String(tz * -1)];
        }
        return undefined;
    }
    /**
     * Converts timezone info from Zip-Codes.com to a standard Olson tzid.
     * @example
     * Location.getUsaTzid('AZ', 7, 'Y') // 'America/Denver'
     * @param state two-letter all-caps US state abbreviation like 'CA'
     * @param tz positive number, 5=America/New_York, 8=America/Los_Angeles
     * @param dst single char 'Y' or 'N'
     */
    static getUsaTzid(state, tz, dst) {
        tz = +tz;
        if (tz === 10 && state === 'AK') {
            return 'America/Adak';
        }
        else if (tz === 7 && state === 'AZ') {
            return dst === 'Y' ? 'America/Denver' : 'America/Phoenix';
        }
        else {
            return ZIPCODES_TZ_MAP[tz];
        }
    }
    /**
     * Adds a location name for `Location.lookup()` only if the name isn't
     * already being used. Returns `false` if the name is already taken
     * and `true` if successfully added.
     */
    static addLocation(cityName, location) {
        const name = cityName.toLowerCase();
        if (classicCities.has(name)) {
            return false;
        }
        classicCities.set(name, location);
        return true;
    }
}
for (const city of classicCities0) {
    const location = new Location(city[2], city[3], city[1] === 'IL', city[4], city[0], city[1], undefined, city[5]);
    Location.addLocation(city[0], location);
}

/**
 * @private
 */
function zdtToDate(zdt) {
    if (zdt === null) {
        return new Date(NaN);
    }
    const res = new Date(zdt.epochMilliseconds);
    res.setMilliseconds(0);
    return res;
}
function getDate(date) {
    if (hdate.isDate(date))
        return date;
    if (hdate.HDate.isHDate(date))
        return date.greg();
    throw new TypeError(`invalid date: ${date}`);
}
/**
 * Calculate halachic times (zmanim / זְמַנִּים) for a given day and location.
 * Calculations are available for tzeit / tzais (nightfall),
 * shkiah (sunset) and more.
 *
 * Zmanim are estimated using an algorithm published by the US National Oceanic
 * and Atmospheric Administration. The NOAA solar calculator is based on equations
 * from _Astronomical Algorithms_ by Jean Meeus.
 *
 * The sunrise and sunset results are theoretically accurate to within a minute for
 * locations between +/- 72° latitude, and within 10 minutes outside of those latitudes.
 * However, due to variations in atmospheric composition, temperature, pressure and
 * conditions, observed values may vary from calculations.
 * https://gml.noaa.gov/grad/solcalc/calcdetails.html
 *
 * @example
 * const {GeoLocation, Zmanim} = require('@hebcal/core');
 * const latitude = 41.822232;
 * const longitude = -71.448292;
 * const tzid = 'America/New_York';
 * const friday = new Date(2023, 8, 8);
 * const gloc = new GeoLocation(null, latitude, longitude, 0, tzid);
 * const zmanim = new Zmanim(gloc, friday, false);
 * const candleLighting = zmanim.sunsetOffset(-18, true);
 * const timeStr = Zmanim.formatISOWithTimeZone(tzid, candleLighting);
 */
class Zmanim {
    /**
     * Initialize a Zmanim instance.
     * @param gloc GeoLocation including latitude, longitude, and timezone
     * @param date Regular or Hebrew Date. If `date` is a regular `Date`,
     *    hours, minutes, seconds and milliseconds are ignored.
     * @param useElevation use elevation for calculations (default `false`).
     *    If `true`, use elevation to affect the calculation of all sunrise/sunset based
     *    zmanim. Note: there are some zmanim such as degree-based zmanim that are driven
     *    by the amount of light in the sky and are not impacted by elevation.
     *    These zmanim intentionally do not support elevation adjustment.
     */
    constructor(gloc, date, useElevation) {
        const dt = getDate(date);
        this.date = dt;
        this.gloc = gloc;
        const plainDate = Temporal.PlainDate.from({
            year: dt.getFullYear(),
            month: dt.getMonth() + 1,
            day: dt.getDate(),
        });
        this.noaa = new noaa.NOAACalculator(gloc, plainDate);
        this.useElevation = Boolean(useElevation);
    }
    /**
     * Returns `true` if elevation adjustment is enabled
     * for zmanim support elevation adjustment
     */
    getUseElevation() {
        return this.useElevation;
    }
    /**
     * Enables or disables elevation adjustment for zmanim support elevation adjustment
     * @param useElevation
     */
    setUseElevation(useElevation) {
        this.useElevation = useElevation;
    }
    /**
     * Convenience function to get the time when sun is above or below the horizon
     * for a certain angle (in degrees).
     * This function does not support elevation adjustment.
     * @param angle
     * @param rising
     */
    timeAtAngle(angle, rising) {
        const offsetZenith = 90 + angle;
        const zdt = rising
            ? this.noaa.getSunriseOffsetByDegrees(offsetZenith)
            : this.noaa.getSunsetOffsetByDegrees(offsetZenith);
        return zdtToDate(zdt);
    }
    /**
     * Upper edge of the Sun appears over the eastern horizon in the morning (0.833° above horizon)
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    sunrise() {
        const zdt = this.useElevation
            ? this.noaa.getSunrise()
            : this.noaa.getSeaLevelSunrise();
        return zdtToDate(zdt);
    }
    /**
     * Upper edge of the Sun appears over the eastern horizon in the morning (0.833° above horizon).
     * This function does not support elevation adjustment.
     */
    seaLevelSunrise() {
        const zdt = this.noaa.getSeaLevelSunrise();
        return zdtToDate(zdt);
    }
    /**
     * When the upper edge of the Sun disappears below the horizon (0.833° below horizon).
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    sunset() {
        const zdt = this.useElevation
            ? this.noaa.getSunset()
            : this.noaa.getSeaLevelSunset();
        return zdtToDate(zdt);
    }
    /**
     * When the upper edge of the Sun disappears below the horizon (0.833° below horizon).
     * This function does not support elevation adjustment.
     */
    seaLevelSunset() {
        const zdt = this.noaa.getSeaLevelSunset();
        return zdtToDate(zdt);
    }
    /**
     * Civil dawn; Sun is 6° below the horizon in the morning.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    dawn() {
        const zdt = this.noaa.getBeginCivilTwilight();
        return zdtToDate(zdt);
    }
    /**
     * Civil dusk; Sun is 6° below the horizon in the evening.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    dusk() {
        const zdt = this.noaa.getEndCivilTwilight();
        return zdtToDate(zdt);
    }
    /**
     * Returns sunset for the previous day.
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    gregEve() {
        const prev = new Date(this.date);
        prev.setDate(prev.getDate() - 1);
        const zman = new Zmanim(this.gloc, prev, this.useElevation);
        return zman.sunset();
    }
    /**
     * @private
     */
    nightHour() {
        return (this.sunrise().getTime() - this.gregEve().getTime()) / 12; // ms in hour
    }
    /**
     * Midday – Chatzot; Sunrise plus 6 halachic hours
     */
    chatzot() {
        const startOfDay = this.noaa.getSeaLevelSunrise();
        const endOfDay = this.noaa.getSeaLevelSunset();
        const zdt = this.noaa.getSunTransit(startOfDay, endOfDay);
        return zdtToDate(zdt);
    }
    /**
     * Midnight – Chatzot; Sunset plus 6 halachic hours.
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    chatzotNight() {
        return new Date(this.sunrise().getTime() - this.nightHour() * 6);
    }
    /**
     * Dawn – Alot haShachar; Sun is 16.1° below the horizon in the morning.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    alotHaShachar() {
        return this.timeAtAngle(16.1, true);
    }
    /**
     * Earliest talis & tefillin – Misheyakir; Sun is 11.5° below the horizon in the morning.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    misheyakir() {
        return this.timeAtAngle(11.5, true);
    }
    /**
     * Earliest talis & tefillin – Misheyakir Machmir; Sun is 10.2° below the horizon in the morning.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    misheyakirMachmir() {
        return this.timeAtAngle(10.2, true);
    }
    /**
     * Utility method for using elevation-aware sunrise/sunset
     * @private
     * @param hours
     */
    getShaahZmanisBasedZman(hours) {
        const startOfDay = this.useElevation
            ? this.noaa.getSunrise()
            : this.noaa.getSeaLevelSunrise();
        const endOfDay = this.useElevation
            ? this.noaa.getSunset()
            : this.noaa.getSeaLevelSunset();
        const temporalHour = this.noaa.getTemporalHour(startOfDay, endOfDay);
        const offset = Math.round(temporalHour * hours);
        const zdt = noaa.NOAACalculator.getTimeOffset(startOfDay, offset);
        return zdtToDate(zdt);
    }
    /**
     * Latest Shema (Gra); Sunrise plus 3 halachic hours, according to the Gra.
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    sofZmanShma() {
        // Gra
        return this.getShaahZmanisBasedZman(3);
    }
    /**
     * Latest Shacharit (Gra); Sunrise plus 4 halachic hours, according to the Gra.
     *
     * This method returns the latest *zman tfila* (time to recite shema in the morning)
     * that is 4 *shaos zmaniyos* (solar hours) after sunrise or sea level sunrise
     * (depending on the `useElevation` setting), according
     * to the [GRA](https://en.wikipedia.org/wiki/Vilna_Gaon).
     *
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    sofZmanTfilla() {
        // Gra
        return this.getShaahZmanisBasedZman(4);
    }
    /**
     * Returns an array with alot (Date) and ms in hour (number)
     * @private
     */
    getTemporalHour72(forceSeaLevel) {
        const alot72 = this.sunriseOffset(-72, false, forceSeaLevel);
        const tzeit72 = this.sunsetOffset(72, false, forceSeaLevel);
        const temporalHour = (tzeit72.getTime() - alot72.getTime()) / 12;
        return [alot72, temporalHour];
    }
    /**
     * Returns an array with alot (Date) and ms in hour (number)
     * @private
     */
    getTemporalHourByDeg(angle) {
        const alot = this.timeAtAngle(angle, true);
        const tzeit = this.timeAtAngle(angle, false);
        const temporalHour = (tzeit.getTime() - alot.getTime()) / 12;
        return [alot, temporalHour];
    }
    /**
     * Latest Shema (MGA); Sunrise plus 3 halachic hours, according to Magen Avraham.
     * Based on the opinion of the MGA that the day is calculated from
     * dawn being fixed 72 minutes before sea-level sunrise, and nightfall is fixed
     * 72 minutes after sea-level sunset.
     */
    sofZmanShmaMGA() {
        // Magen Avraham
        const [alot72, temporalHour] = this.getTemporalHour72(true);
        const offset = Math.floor(3 * temporalHour);
        return new Date(alot72.getTime() + offset);
    }
    /**
     * Latest Shema (MGA); Sunrise plus 3 halachic hours, according to Magen Avraham.
     * Based on the opinion of the MGA that the day is calculated from
     * dawn to nightfall with both being 16.1° below the horizon.
     */
    sofZmanShmaMGA16Point1() {
        const [alot, temporalHour] = this.getTemporalHourByDeg(16.1);
        const offset = Math.floor(3 * temporalHour);
        return new Date(alot.getTime() + offset);
    }
    /**
     * Latest Shema (MGA); Sunrise plus 3 halachic hours, according to Magen Avraham.
     * Based on the opinion of the MGA that the day is calculated from
     * dawn to nightfall with both being 19.8° below the horizon.
     *
     * This calculation is based on the position of the sun 90 minutes after sunset in Jerusalem
     * around the equinox / equilux which calculates to 19.8° below geometric zenith.
     * https://kosherjava.com/2022/01/12/equinox-vs-equilux-zmanim-calculations/
     */
    sofZmanShmaMGA19Point8() {
        const [alot, temporalHour] = this.getTemporalHourByDeg(19.8);
        const offset = Math.floor(3 * temporalHour);
        return new Date(alot.getTime() + offset);
    }
    /**
     * Latest Shacharit (MGA); Sunrise plus 4 halachic hours, according to Magen Avraham
     */
    sofZmanTfillaMGA() {
        // Magen Avraham
        const [alot72, temporalHour] = this.getTemporalHour72(true);
        const offset = Math.floor(4 * temporalHour);
        return new Date(alot72.getTime() + offset);
    }
    /**
     * Latest Shacharit (MGA); Sunrise plus 4 halachic hours, according to Magen Avraham.
     * Based on the opinion of the MGA that the day is calculated from
     * dawn to nightfall with both being 16.1° below the horizon.
     */
    sofZmanTfillaMGA16Point1() {
        const [alot, temporalHour] = this.getTemporalHourByDeg(16.1);
        const offset = Math.floor(4 * temporalHour);
        return new Date(alot.getTime() + offset);
    }
    /**
     * Latest Shacharit (MGA); Sunrise plus 4 halachic hours, according to Magen Avraham.
     * Based on the opinion of the MGA that the day is calculated from
     * dawn to nightfall with both being 19.8° below the horizon.
     *
     * This calculation is based on the position of the sun 90 minutes after sunset in Jerusalem
     * around the equinox / equilux which calculates to 19.8° below geometric zenith.
     * https://kosherjava.com/2022/01/12/equinox-vs-equilux-zmanim-calculations/
     */
    sofZmanTfillaMGA19Point8() {
        const [alot, temporalHour] = this.getTemporalHourByDeg(19.8);
        const offset = Math.floor(4 * temporalHour);
        return new Date(alot.getTime() + offset);
    }
    /**
     * Earliest Mincha – Mincha Gedola (GRA); Sunrise plus 6.5 halachic hours.
     * If elevation is enabled, this function will include elevation in the calculation.
     *
     * This method returns the latest mincha gedola, the earliest time one can pray mincha
     * that is 6.5 shaos zmaniyos (solar hours) after sunrise or sea level sunrise
     * (depending on the `useElevation` setting), according
     * to the [GRA](https://en.wikipedia.org/wiki/Vilna_Gaon).
     *
     * The Ramba"m is of the opinion that it is better to delay *mincha* until
     * *mincha ketana* while the Ra"sh, Tur, GRA and others are of the
     * opinion that *mincha* can be prayed *lechatchila* starting at *mincha gedola*.
     */
    minchaGedola() {
        return this.getShaahZmanisBasedZman(6.5);
    }
    /**
     * Earliest Mincha – Mincha Gedola (MGA); Sunrise plus 6.5 halachic hours.
     * If elevation is enabled, this function will include elevation in the calculation.
     *
     * This method returns the time of *mincha gedola* according to the Magen Avraham
     * with the day starting 72 minutes before sunrise and ending 72 minutes after sunset.
     * This is the earliest time to pray *mincha*.
     */
    minchaGedolaMGA() {
        const [alot72, temporalHour] = this.getTemporalHour72(false);
        const offset = Math.floor(6.5 * temporalHour);
        return new Date(alot72.getTime() + offset);
    }
    /**
     * Preferable earliest time to recite Minchah – Mincha Ketana; Sunrise plus 9.5 halachic hours.
     * If elevation is enabled, this function will include elevation in the calculation.
     *
     * This method returns *mincha ketana*, the preferred earliest time to pray *mincha* in the
     * opinion of the [Rambam](https://en.wikipedia.org/wiki/Maimonides) and others,
     * that is 9.5 *shaos zmaniyos* (solar hours) after sunrise or sea level sunrise
     * (depending on the `useElevation` setting), according
     * to the [GRA](https://en.wikipedia.org/wiki/Vilna_Gaon).
     */
    minchaKetana() {
        return this.getShaahZmanisBasedZman(9.5);
    }
    /**
     * This method returns the time of *mincha ketana* according to the Magen Avraham
     * with the day starting 72 minutes before sunrise and ending 72 minutes after sunset.
     * This is the preferred earliest time to pray *mincha* according to the opinion of
     * the [Rambam](https://en.wikipedia.org/wiki/Maimonides) and others.
     *
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    minchaKetanaMGA() {
        const [alot72, temporalHour] = this.getTemporalHour72(false);
        return new Date(alot72.getTime() + Math.floor(9.5 * temporalHour));
    }
    /**
     * Plag haMincha; Sunrise plus 10.75 halachic hours.
     * If elevation is enabled, this function will include elevation in the calculation.
     */
    plagHaMincha() {
        return this.getShaahZmanisBasedZman(10.75);
    }
    /**
     * @param [angle=8.5] optional time for solar depression.
     *   Default is 8.5 degrees for 3 small stars, use 7.083 degrees for 3 medium-sized stars.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    tzeit(angle = 8.5) {
        return this.timeAtAngle(angle, false);
    }
    /**
     * Alias for sunrise
     */
    neitzHaChama() {
        return this.sunrise();
    }
    /**
     * Alias for sunset
     */
    shkiah() {
        return this.sunset();
    }
    /**
     * Rabbeinu Tam holds that bein hashmashos is a specific time
     * between sunset and tzeis hakochavim.
     * One opinion on how to calculate this time is that
     * it is 13.5 minutes before tzies 7.083.
     * Because degree-based functions estimate the amount of light in the sky,
     * the result is not impacted by elevation.
     */
    beinHaShmashos() {
        const tzeit = this.tzeit(7.083);
        const millis = tzeit.getTime();
        if (isNaN(millis)) {
            return tzeit;
        }
        return new Date(millis - 13.5 * 60 * 1000);
    }
    /**
     * Uses timeFormat to return a date like '20:34'
     */
    static formatTime(dt, timeFormat) {
        const time = timeFormat.format(dt);
        const hm = time.split(':');
        if (hm[0] === '24') {
            return '00:' + hm[1];
        }
        return time;
    }
    /**
     * Discards seconds, rounding to nearest minute.
     * @param dt
     */
    static roundTime(dt) {
        const millis = dt.getTime();
        if (isNaN(millis)) {
            return dt;
        }
        // Round up to next minute if needed
        const millisOnly = dt.getMilliseconds();
        const seconds = dt.getSeconds();
        if (seconds === 0 && millisOnly === 0) {
            return dt;
        }
        const secAndMillis = seconds * 1000 + millisOnly;
        const delta = secAndMillis >= 30000 ? 60000 - secAndMillis : -1 * secAndMillis;
        return new Date(millis + delta);
    }
    /**
     * Get offset string (like "+05:00" or "-08:00") from tzid (like "Europe/Moscow")
     * @param tzid
     * @param date
     */
    static timeZoneOffset(tzid, date) {
        const offset = hdate.getTimezoneOffset(tzid, date);
        const offsetAbs = Math.abs(offset);
        const hours = Math.floor(offsetAbs / 60);
        const minutes = offsetAbs % 60;
        return (offset < 0 ? '+' : '-') + hdate.pad2(hours) + ':' + hdate.pad2(minutes);
    }
    /**
     * Returns a string like "2022-04-01T13:06:00-11:00"
     * @param tzid
     * @param date
     */
    static formatISOWithTimeZone(tzid, date) {
        if (isNaN(date.getTime())) {
            return '0000-00-00T00:00:00Z';
        }
        return (hdate.getPseudoISO(tzid, date).substring(0, 19) +
            Zmanim.timeZoneOffset(tzid, date));
    }
    /**
     * Returns sunrise + `offset` minutes (either positive or negative).
     * If elevation is enabled, this function will include elevation in the calculation
     *  unless `forceSeaLevel` is `true`.
     * @param offset minutes
     * @param roundMinute round time to nearest minute (default true)
     * @param forceSeaLevel use sea-level sunrise (default false)
     */
    sunriseOffset(offset, roundMinute = true, forceSeaLevel = false) {
        const sunrise = forceSeaLevel ? this.seaLevelSunrise() : this.sunrise();
        if (isNaN(sunrise.getTime())) {
            return sunrise;
        }
        if (roundMinute) {
            // For positive offsets only, round up to next minute if needed
            if (offset > 0 && sunrise.getSeconds() >= 30) {
                offset++;
            }
            sunrise.setSeconds(0, 0);
        }
        return new Date(sunrise.getTime() + offset * 60 * 1000);
    }
    /**
     * Returns sunset + `offset` minutes (either positive or negative).
     * If elevation is enabled, this function will include elevation in the calculation
     *  unless `forceSeaLevel` is `true`.
     * @param offset minutes
     * @param roundMinute round time to nearest minute (default true)
     * @param forceSeaLevel use sea-level sunset (default false)
     */
    sunsetOffset(offset, roundMinute = true, forceSeaLevel = false) {
        const sunset = forceSeaLevel ? this.seaLevelSunset() : this.sunset();
        if (isNaN(sunset.getTime())) {
            return sunset;
        }
        if (roundMinute) {
            // For Havdalah only, round up to next minute if needed
            if (offset > 0 && sunset.getSeconds() >= 30) {
                offset++;
            }
            sunset.setSeconds(0, 0);
        }
        return new Date(sunset.getTime() + offset * 60 * 1000);
    }
    /**
     * Returns the Hebrew date relative to the specified location and Gregorian date,
     * taking into consideration whether the time is before or after sunset.
     *
     * For example, if the given date and is `2024-09-22T10:35` (before sunset), and
     * sunset for the specified location is **19:04**, then this function would
     * return a Hebrew date of `19th of Elul, 5784`.
     * If the given date is the same Gregorian day after sunset
     * (for example `2024-09-22T20:07`), this function would return a
     * Hebrew date of `20th of Elul, 5784`.
     * @example
     * const {GeoLocation, Zmanim, HDate} = require('@hebcal/core');
     * const latitude = 48.85341;
     * const longitude = 2.3488;
     * const timezone = 'Europe/Paris';
     * const gloc = new GeoLocation(null, latitude, longitude, 0, timezone);
     * const before = Zmanim.makeSunsetAwareHDate(gloc, new Date('2024-09-22T17:38:46.123Z'), false);
     * console.log(before.toString()); // '19 Elul 5784'
     * const after = Zmanim.makeSunsetAwareHDate(gloc, new Date('2024-09-22T23:45:18.345Z'), false);
     * console.log(after.toString()); // '20 Elul 5784'
     */
    static makeSunsetAwareHDate(gloc, date, useElevation) {
        const zmanim = new Zmanim(gloc, date, useElevation);
        const sunset = zmanim.sunset();
        let hd = new hdate.HDate(date);
        const sunsetMillis = sunset.getTime();
        if (isNaN(sunsetMillis)) {
            return hd;
        }
        if (date.getTime() >= sunsetMillis) {
            hd = hd.next();
        }
        return hd;
    }
}

const hour12cc = {
    US: 1,
    CA: 1,
    BR: 1,
    AU: 1,
    NZ: 1,
    DO: 1,
    PR: 1,
    GR: 1,
    IN: 1,
    KR: 1,
    NP: 1,
    ZA: 1,
};
/**
 * @private
 * @param timeStr - original time like "20:30"
 * @param suffix - "p" or "pm" or " P.M.". Add leading space if you want it
 * @param options
 */
function reformatTimeStr(timeStr, suffix, options) {
    var _a;
    if (typeof timeStr !== 'string')
        throw new TypeError(`Bad timeStr: ${timeStr}`);
    const cc = ((_a = options === null || options === undefined ? undefined : options.location) === null || _a === undefined ? undefined : _a.getCountryCode()) || ((options === null || options === undefined ? undefined : options.il) ? 'IL' : 'US');
    const hour12 = options === null || options === undefined ? undefined : options.hour12;
    if (typeof hour12 !== 'undefined' && !hour12) {
        return timeStr;
    }
    if (!hour12 && typeof hour12cc[cc] === 'undefined') {
        return timeStr;
    }
    const hm = timeStr.split(':');
    let hour = parseInt(hm[0], 10);
    if (hour < 12 && suffix) {
        suffix = suffix.replace('p', 'a').replace('P', 'A');
        if (hour === 0) {
            hour = 12;
        }
    }
    else if (hour > 12) {
        hour = hour % 12;
    }
    else if (hour === 0) {
        hour = '00';
    }
    return `${hour}:${hm[1]}${suffix}`;
}

/** An event that has an `eventTime` and `eventTimeStr` */
class TimedEvent extends Event {
    /**
     * @param desc Description (not translated)
     */
    constructor(date, desc, mask, eventTime, location, linkedEvent, options) {
        super(date, desc, mask);
        this.eventTime = Zmanim.roundTime(eventTime);
        this.location = location;
        const timeFormat = location.getTimeFormatter();
        this.eventTimeStr = Zmanim.formatTime(this.eventTime, timeFormat);
        const opts = Object.assign(Object.assign({}, options), { location });
        this.fmtTime = reformatTimeStr(this.eventTimeStr, 'pm', opts);
        if (typeof linkedEvent !== 'undefined') {
            this.linkedEvent = linkedEvent;
        }
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        return hdate.Locale.gettext(this.getDesc(), locale) + ': ' + this.fmtTime;
    }
    /**
     * Returns translation of "Candle lighting" without the time.
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        return hdate.Locale.gettext(this.getDesc(), locale);
    }
    getCategories() {
        const desc = this.getDesc();
        switch (desc) {
            // LIGHT_CANDLES or LIGHT_CANDLES_TZEIS
            case 'Candle lighting':
                return ['candles'];
            // YOM_TOV_ENDS
            case 'Havdalah':
                return ['havdalah'];
            // flags.MINOR_FAST or flags.MAJOR_FAST
            case 'Fast begins':
            case 'Fast ends':
                return ['zmanim', 'fast'];
        }
        /* NOTREACHED */
        return ['unknown'];
    }
}
/** Candle lighting before Shabbat or holiday */
class CandleLightingEvent extends TimedEvent {
    constructor(date, mask, eventTime, location, linkedEvent, options) {
        super(date, 'Candle lighting', mask, eventTime, location, linkedEvent, options);
    }
    getEmoji() {
        return '🕯️';
    }
}
/** Havdalah after Shabbat or holiday */
class HavdalahEvent extends TimedEvent {
    constructor(date, mask, eventTime, location, havdalahMins, linkedEvent, options) {
        super(date, 'Havdalah', mask, eventTime, location, linkedEvent, options);
        if (havdalahMins) {
            this.havdalahMins = havdalahMins;
        }
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        return this.renderBrief(locale) + ': ' + this.fmtTime;
    }
    /**
     * Returns translation of "Havdalah" without the time.
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        let str = hdate.Locale.gettext(this.getDesc(), locale);
        if (this.havdalahMins) {
            const min = hdate.Locale.gettext('min', locale);
            str += ` (${this.havdalahMins} ${min})`;
        }
        return str;
    }
    getEmoji() {
        return '✨';
    }
}

const Nisan = hdate.months.NISAN;
const Iyyar = hdate.months.IYYAR;
const Sivan = hdate.months.SIVAN;
const Tamuz = hdate.months.TAMUZ;
const Av = hdate.months.AV;
const Elul = hdate.months.ELUL;
const Tishrei = hdate.months.TISHREI;
const Cheshvan = hdate.months.CHESHVAN;
const Kislev = hdate.months.KISLEV;
const Shvat = hdate.months.SHVAT;
const Adar2 = hdate.months.ADAR_II;
const CHAG$1 = flags.CHAG;
const LIGHT_CANDLES$2 = flags.LIGHT_CANDLES;
const YOM_TOV_ENDS$1 = flags.YOM_TOV_ENDS;
const CHUL_ONLY$1 = flags.CHUL_ONLY;
const IL_ONLY$2 = flags.IL_ONLY;
const LIGHT_CANDLES_TZEIS$3 = flags.LIGHT_CANDLES_TZEIS;
const CHANUKAH_CANDLES$2 = flags.CHANUKAH_CANDLES;
const MAJOR_FAST$2 = flags.MAJOR_FAST;
const MINOR_HOLIDAY$2 = flags.MINOR_HOLIDAY;
const EREV$2 = flags.EREV;
const CHOL_HAMOED$1 = flags.CHOL_HAMOED;
const emojiPesach = '🫓';
const emojiSukkot = '🌿🍋';
const ROSH_HASHANA_II = 'Rosh Hashana II';
const EREV_YOM_KIPPUR = 'Erev Yom Kippur';
const YOM_KIPPUR = 'Yom Kippur';
const EREV_SUKKOT = 'Erev Sukkot';
const SUKKOT_I = 'Sukkot I';
const SUKKOT_II = 'Sukkot II';
const SUKKOT_III_CHM = "Sukkot III (CH''M)";
const SUKKOT_IV_CHM = "Sukkot IV (CH''M)";
const SUKKOT_V_CHM = "Sukkot V (CH''M)";
const SUKKOT_VI_CHM = "Sukkot VI (CH''M)";
const SHMINI_ATZERET = 'Shmini Atzeret';
const SIMCHAT_TORAH = 'Simchat Torah';
const SUKKOT_II_CHM = "Sukkot II (CH''M)";
const SUKKOT_VII_HOSHANA_RABA = 'Sukkot VII (Hoshana Raba)';
const CHANUKAH_1_CANDLE = 'Chanukah: 1 Candle';
const TU_BISHVAT = 'Tu BiShvat';
const EREV_PURIM = 'Erev Purim';
const PURIM = 'Purim';
const SHUSHAN_PURIM = 'Shushan Purim';
const EREV_PESACH = 'Erev Pesach';
const PESACH_I = 'Pesach I';
const PESACH_II = 'Pesach II';
const PESACH_II_CHM = "Pesach II (CH''M)";
const PESACH_III_CHM = "Pesach III (CH''M)";
const PESACH_IV_CHM = "Pesach IV (CH''M)";
const PESACH_V_CHM = "Pesach V (CH''M)";
const PESACH_VI_CHM = "Pesach VI (CH''M)";
const PESACH_VII = 'Pesach VII';
const PESACH_VIII = 'Pesach VIII';
const PESACH_SHENI = 'Pesach Sheni';
const LAG_BAOMER = 'Lag BaOmer';
const EREV_SHAVUOT = 'Erev Shavuot';
const SHAVUOT$1 = 'Shavuot';
const SHAVUOT_I = 'Shavuot I';
const SHAVUOT_II = 'Shavuot II';
const TU_BAV = "Tu B'Av";
const ROSH_HASHANA_LABEHEMOT = 'Rosh Hashana LaBehemot';
const EREV_ROSH_HASHANA = 'Erev Rosh Hashana';
const YOM_YERUSHALAYIM = 'Yom Yerushalayim';
const BEN_GURION_DAY = 'Ben-Gurion Day';
const FAMILY_DAY = 'Family Day';
const YITZHAK_RABIN_MEMORIAL_DAY = 'Yitzhak Rabin Memorial Day';
const HERZL_DAY = 'Herzl Day';
const JABOTINSKY_DAY = 'Jabotinsky Day';
const SIGD = 'Sigd';
const YOM_HAALIYAH = 'Yom HaAliyah';
const YOM_HAALIYAH_SCHOOL_OBSERVANCE = 'Yom HaAliyah School Observance';
const HEBREW_LANGUAGE_DAY = 'Hebrew Language Day';
/**
 * Transliterated names of holidays, used by `Event.getDesc()`
 * @readonly
 * @enum {string}
 */
const holidayDesc = {
    /** Asara B'Tevet */
    ASARA_BTEVET: "Asara B'Tevet",
    /** Birkat Hachamah */
    BIRKAT_HACHAMAH: 'Birkat Hachamah',
    /** Chag HaBanot */
    CHAG_HABANOT: 'Chag HaBanot',
    /** Chanukah: 8th Day */
    CHANUKAH_8TH_DAY: 'Chanukah: 8th Day',
    /** Erev Tish'a B'Av */
    EREV_TISHA_BAV: "Erev Tish'a B'Av",
    /** Leil Selichot */
    LEIL_SELICHOT: 'Leil Selichot',
    /** Purim Katan */
    PURIM_KATAN: 'Purim Katan',
    /** Purim Meshulash */
    PURIM_MESHULASH: 'Purim Meshulash',
    /** Shabbat Chazon */
    SHABBAT_CHAZON: 'Shabbat Chazon',
    /** Shabbat HaChodesh */
    SHABBAT_HACHODESH: 'Shabbat HaChodesh',
    /** Shabbat HaGadol */
    SHABBAT_HAGADOL: 'Shabbat HaGadol',
    /** Shabbat Nachamu */
    SHABBAT_NACHAMU: 'Shabbat Nachamu',
    /** Shabbat Parah */
    SHABBAT_PARAH: 'Shabbat Parah',
    /** Shabbat Shekalim */
    SHABBAT_SHEKALIM: 'Shabbat Shekalim',
    /** Shabbat Shirah */
    SHABBAT_SHIRAH: 'Shabbat Shirah',
    /** Shabbat Shuva */
    SHABBAT_SHUVA: 'Shabbat Shuva',
    /** Shabbat Zachor */
    SHABBAT_ZACHOR: 'Shabbat Zachor',
    /** Shushan Purim Katan */
    SHUSHAN_PURIM_KATAN: 'Shushan Purim Katan',
    /** Ta'anit Bechorot */
    TAANIT_BECHOROT: "Ta'anit Bechorot",
    /** Ta'anit Esther */
    TAANIT_ESTHER: "Ta'anit Esther",
    /** Tish'a B'Av */
    TISHA_BAV: "Tish'a B'Av",
    /** Tzom Gedaliah */
    TZOM_GEDALIAH: 'Tzom Gedaliah',
    /** Tzom Tammuz */
    TZOM_TAMMUZ: 'Tzom Tammuz',
    /** Yom HaAtzma'ut */
    YOM_HAATZMA_UT: "Yom HaAtzma'ut",
    /** Yom HaShoah */
    YOM_HASHOAH: 'Yom HaShoah',
    /** Yom HaZikaron */
    YOM_HAZIKARON: 'Yom HaZikaron',
    /** Ben-Gurion Day */
    BEN_GURION_DAY,
    /** Chanukah: 1 Candle */
    CHANUKAH_1_CANDLE,
    /** Erev Pesach */
    EREV_PESACH,
    /** Erev Purim */
    EREV_PURIM,
    /** Erev Rosh Hashana */
    EREV_ROSH_HASHANA,
    /** Erev Shavuot */
    EREV_SHAVUOT,
    /** Erev Sukkot */
    EREV_SUKKOT,
    /** Erev Yom Kippur */
    EREV_YOM_KIPPUR,
    /** Family Day */
    FAMILY_DAY,
    /** Hebrew Language Day */
    HEBREW_LANGUAGE_DAY,
    /** Herzl Day */
    HERZL_DAY,
    /** Jabotinsky Day */
    JABOTINSKY_DAY,
    /** Lag BaOmer */
    LAG_BAOMER,
    /** Pesach I */
    PESACH_I,
    /** Pesach II */
    PESACH_II,
    /** Pesach III (CH''M) */
    PESACH_III_CHM,
    /** Pesach II (CH''M) */
    PESACH_II_CHM,
    /** Pesach IV (CH''M) */
    PESACH_IV_CHM,
    /** Pesach Sheni */
    PESACH_SHENI,
    /** Pesach VII */
    PESACH_VII,
    /** Pesach VIII */
    PESACH_VIII,
    /** Pesach VI (CH''M) */
    PESACH_VI_CHM,
    /** Pesach V (CH''M) */
    PESACH_V_CHM,
    /** Purim */
    PURIM,
    /** Rosh Hashana II */
    ROSH_HASHANA_II,
    /** Rosh Hashana LaBehemot */
    ROSH_HASHANA_LABEHEMOT,
    /** Shavuot */
    SHAVUOT: SHAVUOT$1,
    /** Shavuot I */
    SHAVUOT_I,
    /** Shavuot II */
    SHAVUOT_II,
    /** Shmini Atzeret */
    SHMINI_ATZERET,
    /** Shushan Purim */
    SHUSHAN_PURIM,
    /** Sigd */
    SIGD,
    /** Simchat Torah */
    SIMCHAT_TORAH,
    /** Sukkot I */
    SUKKOT_I,
    /** Sukkot II */
    SUKKOT_II,
    /** Sukkot III (CH''M) */
    SUKKOT_III_CHM,
    /** Sukkot II (CH''M) */
    SUKKOT_II_CHM,
    /** Sukkot IV (CH''M) */
    SUKKOT_IV_CHM,
    /** Sukkot VII (Hoshana Raba) */
    SUKKOT_VII_HOSHANA_RABA,
    /** Sukkot VI (CH''M) */
    SUKKOT_VI_CHM,
    /** Sukkot V (CH''M) */
    SUKKOT_V_CHM,
    /** Tu B\'Av */
    TU_BAV,
    /** Tu BiShvat */
    TU_BISHVAT,
    /** Yitzhak Rabin Memorial Day */
    YITZHAK_RABIN_MEMORIAL_DAY,
    /** Yom HaAliyah */
    YOM_HAALIYAH,
    /** Yom HaAliyah School Observance */
    YOM_HAALIYAH_SCHOOL_OBSERVANCE,
    /** Yom Kippur */
    YOM_KIPPUR,
    /** Yom Yerushalayim */
    YOM_YERUSHALAYIM,
};
const staticHolidays = [
    {
        mm: Tishrei,
        dd: 2,
        desc: ROSH_HASHANA_II,
        flags: CHAG$1 | YOM_TOV_ENDS$1,
        emoji: '🍏🍯',
    },
    { mm: Tishrei, dd: 9, desc: EREV_YOM_KIPPUR, flags: EREV$2 | LIGHT_CANDLES$2 },
    {
        mm: Tishrei,
        dd: 10,
        desc: YOM_KIPPUR,
        flags: CHAG$1 | MAJOR_FAST$2 | YOM_TOV_ENDS$1,
    },
    {
        mm: Tishrei,
        dd: 14,
        desc: EREV_SUKKOT,
        flags: CHUL_ONLY$1 | EREV$2 | LIGHT_CANDLES$2,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 15,
        desc: SUKKOT_I,
        flags: CHUL_ONLY$1 | CHAG$1 | LIGHT_CANDLES_TZEIS$3,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 16,
        desc: SUKKOT_II,
        flags: CHUL_ONLY$1 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 17,
        desc: SUKKOT_III_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 1,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 18,
        desc: SUKKOT_IV_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 2,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 19,
        desc: SUKKOT_V_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 3,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 20,
        desc: SUKKOT_VI_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 4,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 22,
        desc: SHMINI_ATZERET,
        flags: CHUL_ONLY$1 | CHAG$1 | LIGHT_CANDLES_TZEIS$3,
    },
    {
        mm: Tishrei,
        dd: 23,
        desc: SIMCHAT_TORAH,
        flags: CHUL_ONLY$1 | CHAG$1 | YOM_TOV_ENDS$1,
    },
    {
        mm: Tishrei,
        dd: 14,
        desc: EREV_SUKKOT,
        flags: IL_ONLY$2 | EREV$2 | LIGHT_CANDLES$2,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 15,
        desc: SUKKOT_I,
        flags: IL_ONLY$2 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 16,
        desc: SUKKOT_II_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 1,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 17,
        desc: SUKKOT_III_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 2,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 18,
        desc: SUKKOT_IV_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 3,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 19,
        desc: SUKKOT_V_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 4,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 20,
        desc: SUKKOT_VI_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 5,
        emoji: emojiSukkot,
    },
    {
        mm: Tishrei,
        dd: 22,
        desc: SHMINI_ATZERET,
        flags: IL_ONLY$2 | CHAG$1 | YOM_TOV_ENDS$1,
    },
    {
        mm: Tishrei,
        dd: 21,
        desc: SUKKOT_VII_HOSHANA_RABA,
        flags: LIGHT_CANDLES$2 | CHOL_HAMOED$1,
        chmDay: -1,
        emoji: emojiSukkot,
    },
    {
        mm: Kislev,
        dd: 24,
        desc: CHANUKAH_1_CANDLE,
        flags: EREV$2 | MINOR_HOLIDAY$2 | CHANUKAH_CANDLES$2,
        emoji: '🕎1️⃣',
    },
    { mm: Shvat, dd: 15, desc: TU_BISHVAT, flags: MINOR_HOLIDAY$2, emoji: '🌳' },
    {
        mm: Adar2,
        dd: 13,
        desc: EREV_PURIM,
        flags: EREV$2 | MINOR_HOLIDAY$2,
        emoji: '🎭️📜',
    },
    { mm: Adar2, dd: 14, desc: PURIM, flags: MINOR_HOLIDAY$2, emoji: '🎭️📜' },
    {
        mm: Adar2,
        dd: 15,
        desc: SHUSHAN_PURIM,
        flags: MINOR_HOLIDAY$2,
        emoji: '🎭️📜',
    },
    // Pesach Israel
    {
        mm: Nisan,
        dd: 14,
        desc: EREV_PESACH,
        flags: IL_ONLY$2 | EREV$2 | LIGHT_CANDLES$2,
        emoji: '🫓🍷',
    },
    {
        mm: Nisan,
        dd: 15,
        desc: PESACH_I,
        flags: IL_ONLY$2 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 16,
        desc: PESACH_II_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 1,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 17,
        desc: PESACH_III_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 2,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 18,
        desc: PESACH_IV_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 3,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 19,
        desc: PESACH_V_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1,
        chmDay: 4,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 20,
        desc: PESACH_VI_CHM,
        flags: IL_ONLY$2 | CHOL_HAMOED$1 | LIGHT_CANDLES$2,
        chmDay: 5,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 21,
        desc: PESACH_VII,
        flags: IL_ONLY$2 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiPesach,
    },
    // Pesach chutz l'aretz
    {
        mm: Nisan,
        dd: 14,
        desc: EREV_PESACH,
        flags: CHUL_ONLY$1 | EREV$2 | LIGHT_CANDLES$2,
        emoji: '🫓🍷',
    },
    {
        mm: Nisan,
        dd: 15,
        desc: PESACH_I,
        flags: CHUL_ONLY$1 | CHAG$1 | LIGHT_CANDLES_TZEIS$3,
        emoji: '🫓🍷',
    },
    {
        mm: Nisan,
        dd: 16,
        desc: PESACH_II,
        flags: CHUL_ONLY$1 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 17,
        desc: PESACH_III_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 1,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 18,
        desc: PESACH_IV_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 2,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 19,
        desc: PESACH_V_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1,
        chmDay: 3,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 20,
        desc: PESACH_VI_CHM,
        flags: CHUL_ONLY$1 | CHOL_HAMOED$1 | LIGHT_CANDLES$2,
        chmDay: 4,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 21,
        desc: PESACH_VII,
        flags: CHUL_ONLY$1 | CHAG$1 | LIGHT_CANDLES_TZEIS$3,
        emoji: emojiPesach,
    },
    {
        mm: Nisan,
        dd: 22,
        desc: PESACH_VIII,
        flags: CHUL_ONLY$1 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: emojiPesach,
    },
    { mm: Iyyar, dd: 14, desc: PESACH_SHENI, flags: MINOR_HOLIDAY$2 },
    { mm: Iyyar, dd: 18, desc: LAG_BAOMER, flags: MINOR_HOLIDAY$2, emoji: '🔥' },
    {
        mm: Sivan,
        dd: 5,
        desc: EREV_SHAVUOT,
        flags: EREV$2 | LIGHT_CANDLES$2,
        emoji: '⛰️🌸',
    },
    {
        mm: Sivan,
        dd: 6,
        desc: SHAVUOT$1,
        flags: IL_ONLY$2 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: '⛰️🌸',
    },
    {
        mm: Sivan,
        dd: 6,
        desc: SHAVUOT_I,
        flags: CHUL_ONLY$1 | CHAG$1 | LIGHT_CANDLES_TZEIS$3,
        emoji: '⛰️🌸',
    },
    {
        mm: Sivan,
        dd: 7,
        desc: SHAVUOT_II,
        flags: CHUL_ONLY$1 | CHAG$1 | YOM_TOV_ENDS$1,
        emoji: '⛰️🌸',
    },
    { mm: Av, dd: 15, desc: TU_BAV, flags: MINOR_HOLIDAY$2, emoji: '❤️' },
    {
        mm: Elul,
        dd: 1,
        desc: ROSH_HASHANA_LABEHEMOT,
        flags: MINOR_HOLIDAY$2,
        emoji: '🐑',
    },
    {
        mm: Elul,
        dd: 29,
        desc: EREV_ROSH_HASHANA,
        flags: EREV$2 | LIGHT_CANDLES$2,
        emoji: '🍏🍯',
    },
];
const staticModernHolidays = [
    { firstYear: 5727, mm: Iyyar, dd: 28, desc: YOM_YERUSHALAYIM, chul: true },
    {
        firstYear: 5737,
        mm: Kislev,
        dd: 6,
        desc: BEN_GURION_DAY,
        satPostponeToSun: true,
        friPostponeToSun: true,
    },
    { firstYear: 5750, mm: Shvat, dd: 30, desc: FAMILY_DAY },
    {
        firstYear: 5758,
        mm: Cheshvan,
        dd: 12,
        desc: YITZHAK_RABIN_MEMORIAL_DAY,
        friSatMovetoThu: true,
    },
    { firstYear: 5764, mm: Iyyar, dd: 10, desc: HERZL_DAY, satPostponeToSun: true },
    {
        firstYear: 5765,
        mm: Tamuz,
        dd: 29,
        desc: JABOTINSKY_DAY,
        satPostponeToSun: true,
    },
    {
        firstYear: 5769,
        mm: Cheshvan,
        dd: 29,
        desc: SIGD,
        chul: true,
        suppressEmoji: true,
        friSatMovetoThu: true,
    },
    { firstYear: 5777, mm: Nisan, dd: 10, desc: YOM_HAALIYAH, chul: true },
    { firstYear: 5777, mm: Cheshvan, dd: 7, desc: YOM_HAALIYAH_SCHOOL_OBSERVANCE },
    // https://www.gov.il/he/departments/policies/2012_des5234
    {
        firstYear: 5773,
        mm: hdate.months.TEVET,
        dd: 21,
        desc: HEBREW_LANGUAGE_DAY,
        friSatMovetoThu: true,
    },
];

/** Represents a built-in holiday like Pesach, Purim or Tu BiShvat */
class HolidayEvent extends Event {
    basename() {
        return this.getDesc()
            .replace(/ \d{4}$/, '')
            .replace(/ \(CH''M\)$/, '')
            .replace(/ \(observed\)$/, '')
            .replace(/ \(Hoshana Raba\)$/, '')
            .replace(/ [IV]+$/, '')
            .replace(/: \d Candles?$/, '')
            .replace(/: 8th Day$/, '')
            .replace(/^Erev /, '');
    }
    url() {
        const year = this.getDate().greg().getFullYear();
        if (year < 100) {
            return undefined;
        }
        const url = 'https://www.hebcal.com/holidays/' +
            this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') +
            '-' +
            this.urlDateSuffix();
        return this.getFlags() & flags.IL_ONLY ? url + '?i=on' : url;
    }
    urlDateSuffix() {
        const year = this.getDate().greg().getFullYear();
        return String(year);
    }
    getEmoji() {
        if (this.emoji) {
            return this.emoji;
        }
        else if (this.getFlags() & flags.SPECIAL_SHABBAT) {
            return '🕍';
        }
        else {
            return '✡️';
        }
    }
    getCategories() {
        if (this.cholHaMoedDay) {
            return ['holiday', 'major', 'cholhamoed'];
        }
        const cats = super.getCategories();
        if (cats[0] !== 'unknown') {
            return cats;
        }
        // Don't depend on flags.MINOR_HOLIDAY always being set. Look for minor holidays.
        const desc = this.getDesc();
        switch (desc) {
            case holidayDesc.LAG_BAOMER:
            case holidayDesc.LEIL_SELICHOT:
            case holidayDesc.PESACH_SHENI:
            case holidayDesc.EREV_PURIM:
            case holidayDesc.PURIM_KATAN:
            case holidayDesc.SHUSHAN_PURIM:
            case holidayDesc.TU_BAV:
            case holidayDesc.TU_BISHVAT:
            case holidayDesc.ROSH_HASHANA_LABEHEMOT:
                return ['holiday', 'minor'];
        }
        return ['holiday', 'major'];
    }
    /**
     * Returns (translated) description of this event
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        const str = super.render(locale);
        return str.replace(/'/g, '’');
    }
    /**
     * Returns a brief (translated) description of this event.
     * For most events, this is the same as render(). For some events, it procudes
     * a shorter text (e.g. without a time or added description).
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        const str = super.renderBrief(locale);
        return str.replace(/'/g, '’');
    }
    /**
     * Makes a clone of this Event object
     * @deprecated
     */
    clone() {
        const ev = new HolidayEvent(this.date, this.desc, this.mask);
        // overwrite all enumerable properties
        Object.assign(ev, this);
        return ev;
    }
}
/**
 * Because Asara B'Tevet often occurs twice in the same Gregorian year,
 * we subclass HolidayEvent to generate the correct URL.
 */
class AsaraBTevetEvent extends HolidayEvent {
    urlDateSuffix() {
        const isoDate = hdate.isoDateString(this.getDate().greg());
        return isoDate.replace(/-/g, '');
    }
}
/**
 * Because Chanukah sometimes starts in December and ends in January,
 * we subclass HolidayEvent to generate the correct URL.
 */
class ChanukahEvent extends HolidayEvent {
    urlDateSuffix() {
        const dt = this.getDate().greg();
        let year = dt.getFullYear();
        if (dt.getMonth() === 0) {
            year--;
        }
        return String(year);
    }
}
/** Represents Rosh Hashana, the Jewish New Year */
class RoshHashanaEvent extends HolidayEvent {
    /**
     * @private
     * @param date Hebrew date event occurs
     * @param hyear Hebrew year
     * @param mask optional holiday flags
     */
    constructor(date, hyear, mask) {
        super(date, `Rosh Hashana ${hyear}`, mask);
        this.hyear = hyear;
    }
    /**
     * Returns (translated) description of this event
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        return hdate.Locale.gettext('Rosh Hashana', locale) + ' ' + this.hyear;
    }
    getEmoji() {
        return '🍏🍯';
    }
}
const roshChodeshStr = 'Rosh Chodesh';
/** Represents Rosh Chodesh, the beginning of a new month */
class RoshChodeshEvent extends HolidayEvent {
    /**
     * Constructs Rosh Chodesh event
     * @param date Hebrew date event occurs
     * @param monthName Hebrew month name (not translated)
     */
    constructor(date, monthName) {
        super(date, `${roshChodeshStr} ${monthName}`, flags.ROSH_CHODESH);
    }
    /**
     * Returns (translated) description of this event
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        const monthName = this.getDesc().substring(roshChodeshStr.length + 1);
        const monthName0 = hdate.Locale.gettext(monthName, locale);
        const monthName1 = monthName0.replace(/'/g, '’');
        return hdate.Locale.gettext(roshChodeshStr, locale) + ' ' + monthName1;
    }
    basename() {
        return this.getDesc();
    }
    getEmoji() {
        return this.emoji || '🌒';
    }
}

/* eslint-disable max-len */
const LIGHT_CANDLES$1 = flags.LIGHT_CANDLES;
const LIGHT_CANDLES_TZEIS$2 = flags.LIGHT_CANDLES_TZEIS;
/**
 * @private
 */
function makeCandleEvent(ev, hd, options, isFriday, isSaturday) {
    let havdalahTitle = false;
    let useHavdalahOffset = isSaturday;
    let mask = ev ? ev.getFlags() : LIGHT_CANDLES$1;
    if (typeof ev !== 'undefined') {
        // if linked event && dow == FRI, use Candle lighting time & title
        if (!isFriday) {
            if (mask & (LIGHT_CANDLES_TZEIS$2 | flags.CHANUKAH_CANDLES)) {
                useHavdalahOffset = true;
            }
            else if (mask & flags.YOM_TOV_ENDS) {
                havdalahTitle = true;
                useHavdalahOffset = true;
            }
        }
    }
    else if (isSaturday) {
        havdalahTitle = true;
        mask = LIGHT_CANDLES_TZEIS$2;
    }
    // if Havdalah offset is 0 or undefined, we'll use tzeit time
    const offset = useHavdalahOffset
        ? Number(options.havdalahMins)
        : Number(options.candleLightingMins);
    const location = options.location;
    const useElevation = Boolean(options.useElevation);
    const zmanim = new Zmanim(location, hd, useElevation);
    const time = useHavdalahOffset && !offset
        ? zmanim.tzeit(options.havdalahDeg)
        : zmanim.sunsetOffset(offset, true);
    if (isNaN(time.getTime())) {
        return undefined; // no sunset
    }
    if (havdalahTitle) {
        return new HavdalahEvent(hd, mask, time, location, options.havdalahMins, ev, options);
    }
    else {
        mask |= LIGHT_CANDLES$1;
        return new CandleLightingEvent(hd, mask, time, location, ev, options);
    }
}
const FAST_BEGINS = 'Fast begins';
const FAST_ENDS = 'Fast ends';
/** A fast day also contains a start and end time */
class FastDayEvent extends HolidayEvent {
    constructor(linkedEvent, startEvent, endEvent) {
        super(linkedEvent.getDate(), linkedEvent.getDesc(), linkedEvent.getFlags());
        this.linkedEvent = linkedEvent;
        this.startEvent = startEvent;
        this.endEvent = endEvent;
    }
    render(locale) {
        return this.linkedEvent.render(locale);
    }
    renderBrief(locale) {
        return this.linkedEvent.renderBrief(locale);
    }
    urlDateSuffix() {
        return this.linkedEvent.urlDateSuffix();
    }
    url() {
        return this.linkedEvent.url();
    }
    getEmoji() {
        return this.linkedEvent.getEmoji();
    }
    getCategories() {
        return this.linkedEvent.getCategories();
    }
}
/**
 * Makes a pair of events representing fast start and end times
 * @private
 */
function makeFastStartEnd(ev, options) {
    const desc = ev.getDesc();
    if (desc === 'Yom Kippur') {
        throw new RangeError('YK does not require this function');
    }
    const hd = ev.getDate();
    const dt = hd.greg();
    const location = options.location;
    const fastEndDeg = options.fastEndDeg;
    const useElevation = Boolean(options.useElevation);
    const zmanim = new Zmanim(location, dt, useElevation);
    let startEvent;
    let endEvent;
    if (desc === "Erev Tish'a B'Av") {
        const sunset = zmanim.sunset();
        if (!isNaN(sunset.getTime())) {
            startEvent = makeTimedEvent(ev, sunset, FAST_BEGINS, options);
        }
    }
    else if (desc.startsWith("Tish'a B'Av")) {
        const tzeit = zmanim.tzeit(fastEndDeg);
        if (!isNaN(tzeit.getTime())) {
            endEvent = makeTimedEvent(ev, tzeit, FAST_ENDS, options);
        }
    }
    else {
        const dawn = zmanim.alotHaShachar();
        if (!isNaN(dawn.getTime())) {
            startEvent = makeTimedEvent(ev, dawn, FAST_BEGINS, options);
        }
        if (dt.getDay() !== 5 &&
            !(hd.getDate() === 14 && hd.getMonth() === hdate.months.NISAN)) {
            const tzeit = zmanim.tzeit(fastEndDeg);
            if (!isNaN(tzeit.getTime())) {
                endEvent = makeTimedEvent(ev, tzeit, FAST_ENDS, options);
            }
        }
    }
    const ev2 = new FastDayEvent(ev, startEvent, endEvent);
    // copy properties such as memo or emoji
    Object.assign(ev2, ev);
    return ev2;
}
/**
 * @private
 */
function makeTimedEvent(ev, time, desc, options) {
    const location = options.location;
    const hd = ev.getDate();
    return new TimedEvent(hd, desc, ev.getFlags(), time, location, ev, options);
}
class TimedChanukahEvent extends ChanukahEvent {
    constructor(date, desc, mask, eventTime, location) {
        super(date, desc, mask);
        this.eventTime = Zmanim.roundTime(eventTime);
        const timeFormat = location.getTimeFormatter();
        this.eventTimeStr = Zmanim.formatTime(this.eventTime, timeFormat);
        this.location = location;
    }
}
/**
 * Makes a candle-lighting event for Chankah (not on Friday/Saturday).
 * At one point this used civil dusk (6 degrees below horizon).
 * Another source suggests 4.6667 degrees below horizon.
 * @private
 */
function makeWeekdayChanukahCandleLighting(ev, hd, options) {
    const location = options.location;
    const useElevation = Boolean(options.useElevation);
    const zmanim = new Zmanim(location, hd.greg(), useElevation);
    const candleLightingTime = zmanim.beinHaShmashos();
    if (isNaN(candleLightingTime.getTime())) {
        return null;
    }
    const ev2 = new TimedChanukahEvent(hd, ev.getDesc(), ev.getFlags(), candleLightingTime, location);
    ev2.emoji = ev.emoji;
    ev2.chanukahDay = ev.chanukahDay;
    return ev2;
}

/* eslint-disable camelcase */
const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const heDayNames = [
    'רִאשׁוֹן',
    'שֵׁנִי',
    'שְׁלִישִׁי',
    'רְבִיעִי',
    'חֲמִישִׁי',
    'שִׁישִּׁי',
    'שַׁבָּת',
];
const night = 'בַּלַּ֥יְלָה';
function getHebrewTimeOfDay(hour) {
    if (hour < 5)
        return night;
    else if (hour < 12)
        return 'בַּבֹּקֶר';
    else if (hour < 17)
        return 'בַּצׇּהֳרַיִים';
    else if (hour < 21)
        return 'בָּעֶרֶב';
    return night;
}
/**
 * Represents a molad, the moment when the new moon is "born"
 */
class Molad {
    /**
     * Calculates the molad for a Hebrew month
     * @param year
     * @param month
     */
    constructor(year, month) {
        this.m = hdate.molad(year, month);
    }
    /**
     */
    getYear() {
        return this.m.year;
    }
    /**
     */
    getMonth() {
        return this.m.month;
    }
    /**
     */
    getMonthName() {
        return hdate.HDate.getMonthName(this.m.month, this.m.year);
    }
    /**
     * @returns Day of Week (0=Sunday, 6=Saturday)
     */
    getDow() {
        return this.m.dayOfWeek;
    }
    /**
     * @returns hour of day (0-23)
     */
    getHour() {
        return this.m.hour;
    }
    /**
     * @returns minutes past hour (0-59)
     */
    getMinutes() {
        return this.m.minutes;
    }
    /**
     * @returns parts of a minute (0-17)
     */
    getChalakim() {
        return this.m.chalakim;
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale)
     * @param options
     */
    render(locale, options) {
        var _a;
        locale = locale !== null && locale !== undefined ? locale : hdate.Locale.getLocaleName();
        if (typeof locale === 'string') {
            locale = locale.toLowerCase();
        }
        const isHebrewLocale = locale === 'he' || locale === 'he-x-nonikud' || locale === 'h';
        const monthName = hdate.Locale.gettext(this.getMonthName(), locale);
        const dayNames = isHebrewLocale ? heDayNames : shortDayNames;
        const dow = dayNames[this.getDow()];
        const minutes = this.getMinutes();
        const hour = this.getHour();
        const chalakim = this.getChalakim();
        const moladStr = hdate.Locale.gettext('Molad', locale);
        const minutesStr = (_a = hdate.Locale.lookupTranslation('min', locale)) !== null && _a !== undefined ? _a : 'minutes';
        const chalakimStr = hdate.Locale.gettext('chalakim', locale);
        if (isHebrewLocale) {
            const ampm = getHebrewTimeOfDay(hour);
            const result = `${moladStr} ${monthName} יִהְיֶה בַּיּוֹם ${dow} בשָׁבוּעַ, ` +
                `בְּשָׁעָה ${hour} ${ampm}, ` +
                `ו-${minutes} ${minutesStr} ` +
                `ו-${chalakim} ${chalakimStr}`;
            if (locale === 'he-x-nonikud') {
                return hdate.Locale.hebrewStripNikkud(result);
            }
            return result;
        }
        const fmtTime = reformatTimeStr(`${hour}:00`, 'pm', options);
        const month = monthName.replace(/'/g, '’');
        return `${moladStr} ${month}: ${dow}, ${minutes} ${minutesStr} and ${chalakim} ${chalakimStr} after ${fmtTime}`;
    }
}
/** Represents a Molad announcement on Shabbat Mevarchim */
class MoladEvent extends Event {
    /**
     * @param date Hebrew date event occurs
     * @param hyear molad year
     * @param hmonth molad month
     * @param options
     */
    constructor(date, hyear, hmonth, options) {
        const m = new Molad(hyear, hmonth);
        const monthName = m.getMonthName();
        super(date, `Molad ${monthName} ${hyear}`, flags.MOLAD);
        this.molad = m;
        this.options = options;
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        return this.molad.render(locale, this.options);
    }
}

/** Represents a day 1-49 of counting the Omer from Pesach to Shavuot */
class OmerEvent extends Event {
    /**
     * @param date
     * @param omerDay
     */
    constructor(date, omerDay) {
        super(date, `Omer ${omerDay}`, flags.OMER_COUNT);
        if (omerDay < 1 || omerDay > 49) {
            throw new RangeError(`Invalid Omer day ${omerDay}`);
        }
        this.weekNumber = Math.floor((omerDay - 1) / 7) + 1;
        this.daysWithinWeeks = omerDay % 7 || 7;
        this.omer = omerDay;
    }
    /**
     * @param lang
     */
    sefira(lang = 'en') {
        if (lang !== 'he' && lang !== 'translit') {
            lang = 'en';
        }
        return hdate.omerSefira(this.omer, lang);
    }
    /**
     * @todo use gettext()
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        locale = locale !== null && locale !== undefined ? locale : hdate.Locale.getLocaleName();
        if (typeof locale === 'string') {
            locale = locale.toLowerCase();
        }
        const isHebrewLocale = locale === 'he' || locale === 'he-x-nonikud' || locale === 'h';
        const omer = this.omer;
        const nth = isHebrewLocale ? hdate.gematriya(omer) : hdate.Locale.ordinal(omer, locale);
        return nth + ' ' + hdate.Locale.gettext('day of the Omer', locale);
    }
    /**
     * Returns translation of "Omer day 22" without ordinal numbers.
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        return (hdate.Locale.gettext('Omer', locale) +
            ' ' +
            hdate.Locale.gettext('day', locale) +
            ' ' +
            this.omer);
    }
    getEmoji() {
        if (typeof this.emoji === 'string')
            return this.emoji;
        return hdate.omerEmoji(this.omer);
    }
    getWeeks() {
        const day7 = this.daysWithinWeeks === 7;
        return day7 ? this.weekNumber : this.weekNumber - 1;
    }
    getDaysWithinWeeks() {
        return this.daysWithinWeeks;
    }
    /**
     * @param locale
     */
    getTodayIs(locale) {
        locale = locale !== null && locale !== undefined ? locale : hdate.Locale.getLocaleName();
        if (typeof locale === 'string') {
            locale = locale.toLowerCase();
        }
        const omerLang = locale === 'he' || locale === 'he-x-nonikud' ? 'he' : 'en';
        const str = hdate.omerTodayIs(this.omer, omerLang);
        if (locale === 'he-x-nonikud') {
            return hdate.Locale.hebrewStripNikkud(str);
        }
        return str;
    }
    url() {
        return `https://www.hebcal.com/omer/${this.getDate().getFullYear()}/${this.omer}`;
    }
}

/** @private */
function renderParshaName(parsha, locale) {
    const locale0 = locale !== null && locale !== undefined ? locale : hdate.Locale.getLocaleName();
    let name = hdate.Locale.gettext(parsha[0], locale0);
    if (parsha.length === 2) {
        const hyphen = locale0 === 'he' ? '־' : '-';
        name += hyphen + hdate.Locale.gettext(parsha[1], locale0);
    }
    name = name.replace(/'/g, '’');
    const str = hdate.Locale.gettext('Parashat', locale) + ' ' + name;
    return str.normalize();
}

class QuickLRU extends Map {
	constructor(options = {}) {
		super();

		if (!(options.maxSize && options.maxSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		if (typeof options.maxAge === 'number' && options.maxAge === 0) {
			throw new TypeError('`maxAge` must be a number greater than 0');
		}

		// TODO: Use private class fields when ESLint supports them.
		this.maxSize = options.maxSize;
		this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
		this.onEviction = options.onEviction;
		this.cache = new Map();
		this.oldCache = new Map();
		this._size = 0;
	}

	// TODO: Use private class methods when targeting Node.js 16.
	_emitEvictions(cache) {
		if (typeof this.onEviction !== 'function') {
			return;
		}

		for (const [key, item] of cache) {
			this.onEviction(key, item.value);
		}
	}

	_deleteIfExpired(key, item) {
		if (typeof item.expiry === 'number' && item.expiry <= Date.now()) {
			if (typeof this.onEviction === 'function') {
				this.onEviction(key, item.value);
			}

			return this.delete(key);
		}

		return false;
	}

	_getOrDeleteIfExpired(key, item) {
		const deleted = this._deleteIfExpired(key, item);
		if (deleted === false) {
			return item.value;
		}
	}

	_getItemValue(key, item) {
		return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
	}

	_peek(key, cache) {
		const item = cache.get(key);

		return this._getItemValue(key, item);
	}

	_set(key, value) {
		this.cache.set(key, value);
		this._size++;

		if (this._size >= this.maxSize) {
			this._size = 0;
			this._emitEvictions(this.oldCache);
			this.oldCache = this.cache;
			this.cache = new Map();
		}
	}

	_moveToRecent(key, item) {
		this.oldCache.delete(key);
		this._set(key, item);
	}

	* _entriesAscending() {
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield item;
				}
			}
		}

		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield item;
			}
		}
	}

	get(key) {
		if (this.cache.has(key)) {
			const item = this.cache.get(key);

			return this._getItemValue(key, item);
		}

		if (this.oldCache.has(key)) {
			const item = this.oldCache.get(key);
			if (this._deleteIfExpired(key, item) === false) {
				this._moveToRecent(key, item);
				return item.value;
			}
		}
	}

	set(key, value, {maxAge = this.maxAge} = {}) {
		const expiry =
			typeof maxAge === 'number' && maxAge !== Number.POSITIVE_INFINITY ?
				Date.now() + maxAge :
				undefined;
		if (this.cache.has(key)) {
			this.cache.set(key, {
				value,
				expiry
			});
		} else {
			this._set(key, {value, expiry});
		}

		return this;
	}

	has(key) {
		if (this.cache.has(key)) {
			return !this._deleteIfExpired(key, this.cache.get(key));
		}

		if (this.oldCache.has(key)) {
			return !this._deleteIfExpired(key, this.oldCache.get(key));
		}

		return false;
	}

	peek(key) {
		if (this.cache.has(key)) {
			return this._peek(key, this.cache);
		}

		if (this.oldCache.has(key)) {
			return this._peek(key, this.oldCache);
		}
	}

	delete(key) {
		const deleted = this.cache.delete(key);
		if (deleted) {
			this._size--;
		}

		return this.oldCache.delete(key) || deleted;
	}

	clear() {
		this.cache.clear();
		this.oldCache.clear();
		this._size = 0;
	}

	resize(newSize) {
		if (!(newSize && newSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		const items = [...this._entriesAscending()];
		const removeCount = items.length - newSize;
		if (removeCount < 0) {
			this.cache = new Map(items);
			this.oldCache = new Map();
			this._size = items.length;
		} else {
			if (removeCount > 0) {
				this._emitEvictions(items.slice(0, removeCount));
			}

			this.oldCache = new Map(items.slice(removeCount));
			this.cache = new Map();
			this._size = 0;
		}

		this.maxSize = newSize;
	}

	* keys() {
		for (const [key] of this) {
			yield key;
		}
	}

	* values() {
		for (const [, value] of this) {
			yield value;
		}
	}

	* [Symbol.iterator]() {
		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesDescending() {
		let items = [...this.cache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		items = [...this.oldCache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesAscending() {
		for (const [key, value] of this._entriesAscending()) {
			yield [key, value.value];
		}
	}

	get size() {
		if (!this._size) {
			return this.oldCache.size;
		}

		let oldCacheSize = 0;
		for (const key of this.oldCache.keys()) {
			if (!this.cache.has(key)) {
				oldCacheSize++;
			}
		}

		return Math.min(this._size + oldCacheSize, this.maxSize);
	}

	entries() {
		return this.entriesAscending();
	}

	forEach(callbackFunction, thisArgument = this) {
		for (const [key, value] of this.entriesAscending()) {
			callbackFunction.call(thisArgument, value, key, this);
		}
	}

	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
}

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * Many of the following algorithms were taken from hebrew calendar
 * routines by Maimonedes, from his Mishneh Torah, and implemented by
 *  Nachum Dershowitz                Department of Computer Science
 *  (217) 333-4219                   University of Illinois at Urbana-Champaign
 *  nachum@cs.uiuedu               1304 West Springfield Avenue
 *                                   Urbana, Illinois 61801
 *
 * The routines were included in the emacs 19 distribution.
 *
 */
const INCOMPLETE = 0;
const REGULAR = 1;
const COMPLETE = 2;
function yearType(hyear) {
    const longC = hdate.HDate.longCheshvan(hyear);
    const shortK = hdate.HDate.shortKislev(hyear);
    if (longC && !shortK) {
        return COMPLETE;
    }
    else if (!longC && shortK) {
        return INCOMPLETE;
    }
    else {
        return REGULAR;
    }
}
/**
 * Represents Parashah HaShavua for an entire Hebrew year
 */
class Sedra {
    /**
     * Caculates the Parashah HaShavua for an entire Hebrew year
     * @param hyear - Hebrew year (e.g. 5749)
     * @param il - Use Israel sedra schedule (false for Diaspora)
     */
    constructor(hyear, il) {
        hyear = +hyear;
        this.year = hyear;
        const rh0 = new hdate.HDate(1, hdate.months.TISHREI, hyear);
        const rh = rh0.abs();
        const rhDay = rh0.getDay() + 1;
        // find the first Saturday on or after Rosh Hashana
        this.firstSaturday = hdate.HDate.dayOnOrBefore(6, rh + 6);
        const leap = +hdate.HDate.isLeapYear(hyear);
        this.il = Boolean(il);
        const type = yearType(hyear);
        let key = `${leap}${rhDay}${type}`;
        if (types[key]) {
            this.theSedraArray = types[key];
        }
        else {
            key = key + +this.il; // cast to num, then concat
            this.theSedraArray = types[key];
        }
        if (!this.theSedraArray) {
            throw new Error(`improper sedra year type ${key} calculated for ${hyear}`);
        }
    }
    /**
     * Returns the parsha (or parshiyot) read on Hebrew date
     * @deprecated Use {@link lookup} instead
     * @param hd Hebrew date or R.D. days
     */
    get(hd) {
        return this.lookup(hd).parsha;
    }
    /**
     * Looks up parsha for the date, then returns a translated or transliterated string
     * @deprecated Use {@link lookup} instead
     * @param hd Hebrew date or R.D. days
     * @param [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale
     */
    getString(hd, locale) {
        const parsha = this.get(hd);
        return renderParshaName(parsha, locale);
    }
    /**
     * Checks to see if this day would be a regular parasha HaShavua
     * Torah reading or special holiday reading
     * @deprecated Use {@link lookup} instead
     * @param hd Hebrew date or R.D. days
     */
    isParsha(hd) {
        return !this.lookup(hd).chag;
    }
    /**
     * Returns the date that a parsha occurs
     * or `null` if the parsha doesn't occur this year
     * @param parsha if a `string`, specified with Sephardic transliterations
     *  like `'Noach'` or `'Matot-Masei'`. If an array, must be a 1- or 2-element
     *  array such as `['Noach']` or `['Matot', 'Masei']`. If a `number`, should
     *  be a 0-based parsha index (`0` for Bereshit, `1` for Noach) or a negative
     *  number for a doubled parsha (e.g. `-21` for Vayakhel-Pekudei)
     */
    find(parsha) {
        if (typeof parsha === 'number') {
            if (parsha >= parshiot.length || (parsha < 0 && !isValidDouble(parsha))) {
                throw new RangeError(`Invalid parsha number: ${parsha}`);
            }
            return this.findInternal(parsha);
        }
        else if (typeof parsha === 'string') {
            const num = parsha2id.get(parsha);
            if (typeof num === 'number') {
                return this.find(num);
            }
            else if (parsha.indexOf('-') !== -1) {
                if (parsha === CHMPESACH || parsha === CHMSUKOT) {
                    return this.findInternal(parsha);
                }
                return this.find(parsha.split('-'));
            }
            else {
                // try to find Saturday holiday like 'Yom Kippur'
                return this.findInternal(parsha);
            }
        }
        else if (Array.isArray(parsha)) {
            const plen = parsha.length;
            if ((plen !== 1 && plen !== 2) || typeof parsha[0] !== 'string') {
                throw new TypeError(`Invalid parsha argument: ${JSON.stringify(parsha)}`);
            }
            if (plen === 1) {
                return this.find(parsha[0]);
            }
            const p1 = parsha[0];
            const p2 = parsha[1];
            const num1 = parsha2id.get(p1);
            const num2 = parsha2id.get(p2);
            if (typeof num1 !== 'number' ||
                typeof num2 !== 'number' ||
                num2 !== num1 + 1 ||
                !isValidDouble(-num1)) {
                throw new RangeError(`Unrecognized parsha name: ${p1}-${p2}`);
            }
            return this.find(-num1);
        }
        return null; /* NOTREACHED */
    }
    findInternal(parsha) {
        const idx = this.theSedraArray.indexOf(parsha);
        if (idx === -1) {
            return null; // doesn't occur this year
        }
        return new hdate.HDate(this.firstSaturday + idx * 7);
    }
    /**
     * Returns the date that a parsha (or its doubled or undoubled counterpart)
     * occurs, or `null` if the parsha doesn't occur this year
     */
    findContaining(parsha) {
        const hdate = this.find(parsha);
        if (hdate) {
            return hdate;
        }
        if (typeof parsha === 'number') {
            // a valid negative number (double parsha in a year where they are
            // combined) would've been found above, and a invalid negative number
            // would've thrown an error, so this parsha must be a positive number
            // representing either p1 or p2
            const p1 = -parsha;
            if (isValidDouble(p1)) {
                return this.find(p1);
            }
            else {
                // this must be the second individual parsha of a doubled pair
                // for example 29 for Kedoshim, so check for -28 for Achrei Mot-Kedoshim
                return this.find(p1 + 1);
            }
        }
        else {
            const num = parsha2id.get(parsha);
            if (num) {
                // parsha is either the first or second individual parsha of
                // a pair that is doubled this year
                const p1 = -num;
                if (isValidDouble(p1)) {
                    return this.find(p1);
                }
                else {
                    return this.find(p1 + 1);
                }
            }
            else {
                // this was indeed a doubled parsha, so return date of the first half
                const [p1] = parsha.split('-');
                return this.find(p1);
            }
        }
    }
    /**
     * Returns the underlying annual sedra schedule.
     * Used by `@hebcal/triennial`
     */
    getSedraArray() {
        return this.theSedraArray;
    }
    /**
     * R.D. date of the first Saturday on or after Rosh Hashana
     */
    getFirstSaturday() {
        return this.firstSaturday;
    }
    getYear() {
        return this.year;
    }
    /**
     * Returns an object describing the parsha on the first Saturday on or after `hd`
     * @param hd Hebrew date or R.D. days
     */
    lookup(hd) {
        const abs = typeof hd === 'number' ? hd : hdate.HDate.isHDate(hd) ? hd.abs() : NaN;
        if (isNaN(abs)) {
            throw new TypeError(`Bad date argument: ${hd}`);
        }
        // find the first saturday on or after today's date
        const saturday = hdate.HDate.dayOnOrBefore(6, abs + 6);
        const weekNum = (saturday - this.firstSaturday) / 7;
        const index = this.theSedraArray[weekNum];
        if (typeof index === 'undefined') {
            const sedra = getSedra(this.year + 1, this.il);
            return sedra.lookup(saturday); // must be next year
        }
        const hdate$1 = new hdate.HDate(saturday);
        if (typeof index === 'string') {
            // Shabbat has a chag. Return a description
            return { parsha: [index], chag: true, hdate: hdate$1 };
        }
        if (index >= 0) {
            return { parsha: [parshiot[index]], chag: false, num: index + 1, hdate: hdate$1 };
        }
        const p1 = D(index); // undouble the parsha
        return {
            parsha: [parshiot[p1], parshiot[p1 + 1]],
            chag: false,
            num: [p1 + 1, p1 + 2],
            hdate: hdate$1,
        };
    }
}
/**
 * The 54 parshiyot of the Torah as transilterated strings.
 * parshiot[0] == 'Bereshit', parshiot[1] == 'Noach', parshiot[52] == "Ha'azinu".
 * @readonly
 * @type {string[]}
 */
const parshiot = [
    'Bereshit',
    'Noach',
    'Lech-Lecha',
    'Vayera',
    'Chayei Sara',
    'Toldot',
    'Vayetzei',
    'Vayishlach',
    'Vayeshev',
    'Miketz',
    'Vayigash',
    'Vayechi',
    'Shemot',
    'Vaera',
    'Bo',
    'Beshalach',
    'Yitro',
    'Mishpatim',
    'Terumah',
    'Tetzaveh',
    'Ki Tisa',
    'Vayakhel',
    'Pekudei',
    'Vayikra',
    'Tzav',
    'Shmini',
    'Tazria',
    'Metzora',
    'Achrei Mot',
    'Kedoshim',
    'Emor',
    'Behar',
    'Bechukotai',
    'Bamidbar',
    'Nasso',
    "Beha'alotcha",
    "Sh'lach",
    'Korach',
    'Chukat',
    'Balak',
    'Pinchas',
    'Matot',
    'Masei',
    'Devarim',
    'Vaetchanan',
    'Eikev',
    "Re'eh",
    'Shoftim',
    'Ki Teitzei',
    'Ki Tavo',
    'Nitzavim',
    'Vayeilech',
    "Ha'azinu",
];
// 0-based parsha IDs
const parsha2id = new Map();
for (let id = 0; id < parshiot.length; id++) {
    const name = parshiot[id];
    parsha2id.set(name, id);
}
// 0-based parsha IDs
const doubles = [
    21, // Vayakhel-Pekudei
    26, // Tazria-Metzora
    28, // Achrei Mot-Kedoshim
    31, // Behar-Bechukotai
    38, // Chukat-Balak
    41, // Matot-Masei
    50, // Nitzavim-Vayeilech
];
/**
 * @private
 * @param id a negative number
 */
function isValidDouble(id) {
    return doubles.includes(-id);
}
/**
 * parsha doubler/undoubler
 * @private
 * @param p
 */
function D(p) {
    return -p;
}
const RH = 'Rosh Hashana'; // 0
const YK = 'Yom Kippur'; // 1
const SUKKOT = 'Sukkot'; // 0
const CHMSUKOT = 'Sukkot Shabbat Chol ha-Moed'; // 0
const SHMINI = 'Shmini Atzeret'; // 0
const PESACH = 'Pesach'; // 25
const PESACH1 = 'Pesach I';
const CHMPESACH = 'Pesach Shabbat Chol ha-Moed'; // 25
const PESACH7 = 'Pesach VII'; // 25
const PESACH8 = 'Pesach VIII';
const SHAVUOT = 'Shavuot'; // 33
/**
 * Returns an array from start to end
 * @private
 * @param start beginning number, inclusive
 * @param stop ending number, inclusive
 */
function range$1(start, stop) {
    return Array.from({ length: stop - start + 1 }, (v, k) => k + start);
}
const yearStartVayeilech = [51, 52, CHMSUKOT];
const yearStartHaazinu = [52, YK, CHMSUKOT];
const yearStartRH = [RH, 52, SUKKOT, SHMINI];
const r020 = range$1(0, 20);
const r027 = range$1(0, 27);
const r3340 = range$1(33, 40);
const r4349 = range$1(43, 49);
const r4350 = range$1(43, 50);
/**
 * The ordinary year types (keviot)
 * names are leap/nonleap - day - incomplete/regular/complete - diaspora/Israel
 * @private
 * @readonly
 */
const types = {
    /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Tuesday. */
    // e.g. 5753
    '020': yearStartVayeilech.concat(r020, D(21), 23, 24, PESACH, 25, D(26), D(28), 30, D(31), r3340, D(41), r4349, D(50)),
    /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Thursday. */
    // e.g. 5756
    '0220': yearStartVayeilech.concat(r020, D(21), 23, 24, PESACH, 25, D(26), D(28), 30, D(31), 33, SHAVUOT, range$1(34, 37), D(38), 40, D(41), r4349, D(50)),
    /* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
     * days and Kislev has 30 days), and has Passover start on Saturday. */
    // e.g. 5701
    '0510': yearStartHaazinu.concat(r020, D(21), 23, 24, PESACH1, PESACH8, 25, D(26), D(28), 30, D(31), r3340, D(41), r4350),
    /* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
     * days and Kislev has 30 days), and has Passover start on Saturday. */
    // e.g. 5745
    '0511': yearStartHaazinu.concat(r020, D(21), 23, 24, PESACH, 25, D(26), D(28), range$1(30, 40), D(41), r4350),
    /* Hebrew year that starts on Thursday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Sunday. */
    // e.g. 5754
    '052': yearStartHaazinu.concat(range$1(0, 24), PESACH7, 25, D(26), D(28), 30, D(31), r3340, D(41), r4350),
    /* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and Kislev
     * each have 29 days), and has Passover start on Sunday. */
    // e.g. 5761
    '070': yearStartRH.concat(r020, D(21), 23, 24, PESACH7, 25, D(26), D(28), 30, D(31), r3340, D(41), r4350),
    /* Hebrew year that starts on Saturday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Tuesday. */
    // e.g. 5716
    '072': yearStartRH.concat(r020, D(21), 23, 24, CHMPESACH, 25, D(26), D(28), 30, D(31), r3340, D(41), r4349, D(50)),
    /* --  The leap year types (keviot) -- */
    /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Thursday. */
    // e.g. 5746
    '1200': yearStartVayeilech.concat(r027, CHMPESACH, range$1(28, 33), SHAVUOT, range$1(34, 37), D(38), 40, D(41), r4349, D(50)),
    /* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Thursday. */
    // e.g. 5746
    '1201': yearStartVayeilech.concat(r027, CHMPESACH, range$1(28, 40), D(41), r4349, D(50)),
    /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Saturday. */
    // e.g.5752
    '1220': yearStartVayeilech.concat(r027, PESACH1, PESACH8, range$1(28, 40), D(41), r4350),
    /* Hebrew year that starts on Monday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Saturday. */
    // e.g.5752
    '1221': yearStartVayeilech.concat(r027, PESACH, range$1(28, 50)),
    /* Hebrew year that starts on Thursday, is `incomplete' (Heshvan and
     * Kislev both have 29 days), and has Passover start on Sunday. */
    // e.g. 5768
    '150': yearStartHaazinu.concat(range$1(0, 28), PESACH7, range$1(29, 50)),
    /* Hebrew year that starts on Thursday, is `complete' (Heshvan and
     * Kislev both have 30 days), and has Passover start on Tuesday. */
    // eg. 5771
    '152': yearStartHaazinu.concat(range$1(0, 28), CHMPESACH, range$1(29, 49), D(50)),
    /* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and
     * Kislev each have 29 days), and has Passover start on Tuesday. */
    // e.g.5757
    '170': yearStartRH.concat(r027, CHMPESACH, range$1(28, 40), D(41), r4349, D(50)),
    /* Hebrew year that starts on Saturday, is `complete' (Heshvan and
     * Kislev each have 30 days), and has Passover start on Thursday. */
    '1720': yearStartRH.concat(r027, CHMPESACH, range$1(28, 33), SHAVUOT, range$1(34, 37), D(38), 40, D(41), r4349, D(50)),
};
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
 * Kislev each have 30 days), and has Passover start on Thursday. */
types['0221'] = types['020'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Thursday. */
// e.g. 5715
types['0310'] = types['0220'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Thursday. */
types['0311'] = types['020'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Saturday. */
// e.g. 5715
types['1310'] = types['1220'];
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
 * days and Kislev has 30 days), and has Passover start on Saturday. */
types['1311'] = types['1221'];
/* Hebrew year that starts on Saturday, is `complete' (Heshvan and
 * Kislev each have 30 days), and has Passover start on Thursday. */
types['1721'] = types['170'];
const sedraCache = new QuickLRU({ maxSize: 400 });
/**
 * Convenience function to create an instance of `Sedra` or reuse a previously
 * created and cached instance.
 * @param hyear
 * @param il
 */
function getSedra(hyear, il) {
    const cacheKey = `${hyear}-${il ? 1 : 0}`;
    let sedra = sedraCache.get(cacheKey);
    if (!sedra) {
        sedra = new Sedra(hyear, il);
        sedraCache.set(cacheKey, sedra);
    }
    return sedra;
}

/**
 * Represents one of 54 weekly Torah portions, always on a Saturday
 */
class ParshaEvent extends Event {
    /**
     * @param parsha - untranslated name of single or double parsha,
     *   such as ['Bereshit'] or ['Achrei Mot', 'Kedoshim']
     */
    constructor(date, parsha, il = false, num = -1) {
        if (!Array.isArray(parsha) || parsha.length === 0 || parsha.length > 2) {
            throw new TypeError('Bad parsha argument');
        }
        const desc = 'Parashat ' + parsha.join('-');
        super(date, desc, flags.PARSHA_HASHAVUA);
        this.parsha = parsha;
        this.il = Boolean(il);
        this.num = num || -1;
    }
    /**
     * @param [locale] Optional locale name (i.e: `'he'`, `'fr'`). Defaults to active locale.
     */
    render(locale) {
        return renderParshaName(this.parsha, locale);
    }
    basename() {
        return this.parsha.join('-');
    }
    url() {
        const year = this.getDate().greg().getFullYear();
        if (year < 100) {
            return undefined;
        }
        const dt = this.urlDateSuffix();
        const url = 'https://www.hebcal.com/sedrot/' +
            this.basename().toLowerCase().replace(/'/g, '').replace(/ /g, '-') +
            '-' +
            dt;
        return this.il ? url + '?i=on' : url;
    }
    urlDateSuffix() {
        const isoDate = hdate.isoDateString(this.getDate().greg());
        return isoDate.replace(/-/g, '');
    }
}

/**
 * Calculates weekly Torah Reading on Saturdays for entire year
 * @param year Hebrew year
 * @param il Israel (false for Diaspora)
 * @returns an array of `ParshaEvent` occurring on Saturdays that contain a regular
 *  (non-holiday) Parashat HaShavua
 */
function parshaYear(year, il) {
    const sedra = getSedra(year, il);
    const startAbs = sedra.getFirstSaturday();
    const endAbs = hdate.HDate.hebrew2abs(year, hdate.months.ELUL, 29);
    const events = [];
    for (let absDt = startAbs; absDt <= endAbs; absDt += 7) {
        const parsha = sedra.lookup(absDt);
        if (!parsha.chag) {
            const ev = new ParshaEvent(parsha.hdate, parsha.parsha, il, parsha.num);
            events.push(ev);
        }
    }
    return events;
}

const SUN$1 = 0;
const TUE$1 = 2;
const FRI$2 = 5;
const SAT$2 = 6;
const NISAN$2 = hdate.months.NISAN;
const IYYAR = hdate.months.IYYAR;
/**
 * Yom HaShoah first observed in 1951.
 * When the actual date of Yom Hashoah falls on a Friday, the
 * state of Israel observes Yom Hashoah on the preceding
 * Thursday. When it falls on a Sunday, Yom Hashoah is observed
 * on the following Monday.
 * http://www.ushmm.org/remembrance/dor/calendar/
 * @private
 * @param year
 */
function dateYomHaShoah(year) {
    if (year < 5711) {
        return null;
    }
    let nisan27dt = new hdate.HDate(27, NISAN$2, year);
    if (nisan27dt.getDay() === FRI$2) {
        nisan27dt = new hdate.HDate(26, NISAN$2, year);
    }
    else if (nisan27dt.getDay() === SUN$1) {
        nisan27dt = new hdate.HDate(28, NISAN$2, year);
    }
    return nisan27dt;
}
/**
 * Yom HaAtzma'ut only celebrated after 1948
 * @private
 * @param year
 */
function dateYomHaZikaron(year) {
    if (year < 5708) {
        return null;
    }
    let day;
    const pesach = new hdate.HDate(15, NISAN$2, year);
    const pdow = pesach.getDay();
    if (pdow === SUN$1) {
        day = 2;
    }
    else if (pdow === SAT$2) {
        day = 3;
    }
    else if (year < 5764) {
        day = 4;
    }
    else if (pdow === TUE$1) {
        day = 5;
    }
    else {
        day = 4;
    }
    return new hdate.HDate(day, IYYAR, year);
}

const ykk = 'Yom Kippur Katan';
/** YKK is minor day of atonement on the day preceeding each Rosh Chodesh */
class YomKippurKatanEvent extends HolidayEvent {
    /**
     * @private
     * @param date Hebrew date event occurs
     * @param nextMonthName name of the upcoming month
     */
    constructor(date, nextMonthName) {
        super(date, `${ykk} ${nextMonthName}`, flags.MINOR_FAST | flags.YOM_KIPPUR_KATAN);
        this.nextMonthName = nextMonthName;
        this.memo = `Minor Day of Atonement on the day preceeding Rosh Chodesh ${nextMonthName}`;
    }
    basename() {
        return this.getDesc();
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        const monthName0 = hdate.Locale.gettext(this.nextMonthName, locale);
        const monthName = monthName0.replace(/'/g, '’');
        return hdate.Locale.gettext(ykk, locale) + ' ' + monthName;
    }
    /**
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        return hdate.Locale.gettext(ykk, locale);
    }
    url() {
        return undefined;
    }
}

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
/** @private */
function observedInIsrael(ev) {
    return ev.observedInIsrael();
}
/** @private */
function observedInDiaspora(ev) {
    return ev.observedInDiaspora();
}
/** @private */
function holidayFilter(il) {
    return il ? observedInIsrael : observedInDiaspora;
}
/**
 * Returns an array of Events on this date (or `undefined` if no events)
 * @param date Hebrew Date, Gregorian date, or absolute R.D. day number
 * @param [il] use the Israeli schedule for holidays
 */
function getHolidaysOnDate(date, il) {
    const hd = hdate.HDate.isHDate(date) ? date : new hdate.HDate(date);
    const hdStr = hd.toString();
    const yearMap = getHolidaysForYear_(hd.getFullYear());
    const events = yearMap.get(hdStr);
    // if il isn't a boolean return both diaspora + IL for day
    if (typeof il === 'undefined' || typeof events === 'undefined') {
        return events;
    }
    const filtered = events.filter(holidayFilter(il));
    return filtered;
}
const CHAG = flags.CHAG;
const IL_ONLY$1 = flags.IL_ONLY;
const LIGHT_CANDLES_TZEIS$1 = flags.LIGHT_CANDLES_TZEIS;
const CHANUKAH_CANDLES$1 = flags.CHANUKAH_CANDLES;
const MINOR_FAST$1 = flags.MINOR_FAST;
const SPECIAL_SHABBAT$1 = flags.SPECIAL_SHABBAT;
const MODERN_HOLIDAY$1 = flags.MODERN_HOLIDAY;
const MAJOR_FAST$1 = flags.MAJOR_FAST;
const MINOR_HOLIDAY$1 = flags.MINOR_HOLIDAY;
const EREV$1 = flags.EREV;
const SUN = 0;
const TUE = 2;
const THU = 4;
const FRI$1 = 5;
const SAT$1 = 6;
const NISAN$1 = hdate.months.NISAN;
const TAMUZ = hdate.months.TAMUZ;
const AV = hdate.months.AV;
const TISHREI$1 = hdate.months.TISHREI;
const KISLEV = hdate.months.KISLEV;
const TEVET = hdate.months.TEVET;
const ADAR_I = hdate.months.ADAR_I;
const ADAR_II = hdate.months.ADAR_II;
const emojiIsraelFlag = { emoji: '🇮🇱' };
const chanukahEmoji = '🕎';
const yearCache = new QuickLRU({ maxSize: 400 });
const KEYCAP_DIGITS = [
    '0️⃣',
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
];
/**
 * Lower-level holidays interface, which returns a `Map` of `Event`s indexed by
 * `HDate.toString()`. These events must filtered especially for `flags.IL_ONLY`
 * or `flags.CHUL_ONLY` depending on Israel vs. Diaspora holiday scheme.
 * @private
 */
function getHolidaysForYear_(year) {
    if (typeof year !== 'number') {
        throw new TypeError(`bad Hebrew year: ${year}`);
    }
    else if (year < 1 || year > 32658) {
        throw new RangeError(`Hebrew year ${year} out of range 1-32658`);
    }
    const cached = yearCache.get(year);
    if (cached) {
        return cached;
    }
    const RH = new hdate.HDate(1, TISHREI$1, year);
    const pesach = new hdate.HDate(15, NISAN$1, year);
    const map = new Map();
    function add(...events) {
        for (const ev of events) {
            const key = ev.date.toString();
            const arr = map.get(key);
            if (typeof arr === 'object') {
                if (arr[0].getFlags() & EREV$1) {
                    arr.unshift(ev);
                }
                else {
                    arr.push(ev);
                }
            }
            else {
                map.set(key, [ev]);
            }
        }
    }
    for (const h of staticHolidays) {
        const hd = new hdate.HDate(h.dd, h.mm, year);
        const ev = new HolidayEvent(hd, h.desc, h.flags);
        if (h.emoji)
            ev.emoji = h.emoji;
        if (h.chmDay)
            ev.cholHaMoedDay = h.chmDay;
        add(ev);
    }
    // standard holidays that don't shift based on year
    add(new RoshHashanaEvent(RH, year, CHAG | LIGHT_CANDLES_TZEIS$1));
    // Variable date holidays
    const tzomGedaliahDay = RH.getDay() === THU ? 4 : 3;
    add(new HolidayEvent(new hdate.HDate(tzomGedaliahDay, TISHREI$1, year), holidayDesc.TZOM_GEDALIAH, MINOR_FAST$1));
    // first SAT after RH
    add(new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, 7 + RH.abs())), holidayDesc.SHABBAT_SHUVA, SPECIAL_SHABBAT$1));
    const rchTevet = hdate.HDate.shortKislev(year)
        ? new hdate.HDate(1, TEVET, year)
        : new hdate.HDate(30, KISLEV, year);
    add(new HolidayEvent(rchTevet, holidayDesc.CHAG_HABANOT, MINOR_HOLIDAY$1));
    // yes, we know Kislev 30-32 are wrong
    // HDate() corrects the month automatically
    for (let candles = 2; candles <= 8; candles++) {
        const hd = new hdate.HDate(23 + candles, KISLEV, year);
        add(new ChanukahEvent(hd, `Chanukah: ${candles} Candles`, MINOR_HOLIDAY$1 | CHANUKAH_CANDLES$1, {
            chanukahDay: candles - 1,
            emoji: chanukahEmoji + KEYCAP_DIGITS[candles],
        }));
    }
    add(new ChanukahEvent(new hdate.HDate(32, KISLEV, year), holidayDesc.CHANUKAH_8TH_DAY, MINOR_HOLIDAY$1, { chanukahDay: 8, emoji: chanukahEmoji }));
    add(new AsaraBTevetEvent(new hdate.HDate(10, TEVET, year), holidayDesc.ASARA_BTEVET, MINOR_FAST$1));
    const pesachAbs = pesach.abs();
    add(new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, pesachAbs - 43)), holidayDesc.SHABBAT_SHEKALIM, SPECIAL_SHABBAT$1), new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, pesachAbs - 30)), holidayDesc.SHABBAT_ZACHOR, SPECIAL_SHABBAT$1), new HolidayEvent(new hdate.HDate(pesachAbs - (pesach.getDay() === TUE ? 33 : 31)), holidayDesc.TAANIT_ESTHER, MINOR_FAST$1));
    const haChodeshAbs = hdate.HDate.dayOnOrBefore(SAT$1, pesachAbs - 14);
    add(new HolidayEvent(new hdate.HDate(haChodeshAbs - 7), holidayDesc.SHABBAT_PARAH, SPECIAL_SHABBAT$1), new HolidayEvent(new hdate.HDate(haChodeshAbs), holidayDesc.SHABBAT_HACHODESH, SPECIAL_SHABBAT$1), new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, pesachAbs - 1)), holidayDesc.SHABBAT_HAGADOL, SPECIAL_SHABBAT$1), new HolidayEvent(
    // if the fast falls on Shabbat, move to Thursday
    pesach.prev().getDay() === SAT$1
        ? pesach.onOrBefore(THU)
        : new hdate.HDate(14, NISAN$1, year), holidayDesc.TAANIT_BECHOROT, MINOR_FAST$1));
    add(new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, new hdate.HDate(1, TISHREI$1, year + 1).abs() - 4)), holidayDesc.LEIL_SELICHOT, MINOR_HOLIDAY$1, { emoji: '🕍' }));
    if (pesach.getDay() === SUN) {
        add(new HolidayEvent(new hdate.HDate(16, ADAR_II, year), holidayDesc.PURIM_MESHULASH, MINOR_HOLIDAY$1));
    }
    if (hdate.HDate.isLeapYear(year)) {
        add(new HolidayEvent(new hdate.HDate(14, ADAR_I, year), holidayDesc.PURIM_KATAN, MINOR_HOLIDAY$1, { emoji: '🎭️' }));
        add(new HolidayEvent(new hdate.HDate(15, ADAR_I, year), holidayDesc.SHUSHAN_PURIM_KATAN, MINOR_HOLIDAY$1, { emoji: '🎭️' }));
    }
    const nisan27dt = dateYomHaShoah(year);
    if (nisan27dt) {
        add(new HolidayEvent(nisan27dt, holidayDesc.YOM_HASHOAH, MODERN_HOLIDAY$1));
    }
    const yomHaZikaronDt = dateYomHaZikaron(year);
    if (yomHaZikaronDt) {
        add(new HolidayEvent(yomHaZikaronDt, holidayDesc.YOM_HAZIKARON, MODERN_HOLIDAY$1, emojiIsraelFlag), new HolidayEvent(yomHaZikaronDt.next(), holidayDesc.YOM_HAATZMA_UT, MODERN_HOLIDAY$1, emojiIsraelFlag));
    }
    for (const h of staticModernHolidays) {
        if (year >= h.firstYear) {
            let hd = new hdate.HDate(h.dd, h.mm, year);
            const dow = hd.getDay();
            if (h.friSatMovetoThu && (dow === FRI$1 || dow === SAT$1)) {
                hd = hd.onOrBefore(THU);
            }
            else if (h.friPostponeToSun && dow === FRI$1) {
                hd = new hdate.HDate(hd.abs() + 2);
            }
            else if (h.satPostponeToSun && dow === SAT$1) {
                hd = hd.next();
            }
            const mask = h.chul ? MODERN_HOLIDAY$1 : MODERN_HOLIDAY$1 | IL_ONLY$1;
            const ev = new HolidayEvent(hd, h.desc, mask);
            if (!h.suppressEmoji) {
                ev.emoji = '🇮🇱';
            }
            add(ev);
        }
    }
    let tamuz17 = new hdate.HDate(17, TAMUZ, year);
    let tamuz17attrs;
    if (tamuz17.getDay() === SAT$1) {
        tamuz17 = new hdate.HDate(18, TAMUZ, year);
        tamuz17attrs = { observed: true };
    }
    add(new HolidayEvent(tamuz17, holidayDesc.TZOM_TAMMUZ, MINOR_FAST$1, tamuz17attrs));
    let av9dt = new hdate.HDate(9, AV, year);
    let av9title = holidayDesc.TISHA_BAV;
    let av9attrs;
    if (av9dt.getDay() === SAT$1) {
        av9dt = av9dt.next();
        av9attrs = { observed: true };
        av9title += ' (observed)';
    }
    const av9abs = av9dt.abs();
    add(new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, av9abs)), holidayDesc.SHABBAT_CHAZON, SPECIAL_SHABBAT$1), new HolidayEvent(av9dt.prev(), holidayDesc.EREV_TISHA_BAV, EREV$1 | MAJOR_FAST$1, av9attrs), new HolidayEvent(av9dt, av9title, MAJOR_FAST$1, av9attrs), new HolidayEvent(new hdate.HDate(hdate.HDate.dayOnOrBefore(SAT$1, av9abs + 7)), holidayDesc.SHABBAT_NACHAMU, SPECIAL_SHABBAT$1));
    const monthsInYear = hdate.HDate.monthsInYear(year);
    for (let month = 1; month <= monthsInYear; month++) {
        const monthName = hdate.HDate.getMonthName(month, year);
        if ((month === NISAN$1
            ? hdate.HDate.daysInMonth(hdate.HDate.monthsInYear(year - 1), year - 1)
            : hdate.HDate.daysInMonth(month - 1, year)) === 30) {
            add(new RoshChodeshEvent(new hdate.HDate(1, month, year), monthName));
            add(new RoshChodeshEvent(new hdate.HDate(30, month - 1, year), monthName));
        }
        else if (month !== TISHREI$1) {
            add(new RoshChodeshEvent(new hdate.HDate(1, month, year), monthName));
        }
    }
    // Begin: Yom Kippur Katan
    // start at Iyyar because one may not fast during Nisan
    for (let month = hdate.months.IYYAR; month <= monthsInYear; month++) {
        const nextMonth = month + 1;
        // Yom Kippur Katan is not observed on the day before Rosh Hashanah.
        // Not observed prior to Rosh Chodesh Cheshvan because Yom Kippur has just passed.
        // Not observed before Rosh Chodesh Tevet, because that day is Hanukkah.
        if (nextMonth === TISHREI$1 ||
            nextMonth === hdate.months.CHESHVAN ||
            nextMonth === TEVET) {
            continue;
        }
        let ykk = new hdate.HDate(29, month, year);
        const dow = ykk.getDay();
        if (dow === FRI$1 || dow === SAT$1) {
            ykk = ykk.onOrBefore(THU);
        }
        const nextMonthName = hdate.HDate.getMonthName(nextMonth, year);
        const ev = new YomKippurKatanEvent(ykk, nextMonthName);
        add(ev);
    }
    const sedra = getSedra(year, false);
    const beshalachHd = sedra.find(15);
    add(new HolidayEvent(beshalachHd, holidayDesc.SHABBAT_SHIRAH, SPECIAL_SHABBAT$1));
    // Birkat Hachamah appears only once every 28 years
    const birkatHaChama = getBirkatHaChama(year);
    if (birkatHaChama) {
        const hd = new hdate.HDate(birkatHaChama);
        add(new HolidayEvent(hd, holidayDesc.BIRKAT_HACHAMAH, MINOR_HOLIDAY$1, { emoji: '☀️' }));
    }
    yearCache.set(year, map);
    return map;
}
/**
 * Birkat Hachamah appears only once every 28 years.
 * Although almost always in Nisan, it can occur in Adar II.
 *   - 27 Adar II 5461 (Gregorian year 1701)
 *   - 29 Adar II 5993 (Gregorian year 2233)
 *
 * Due to drift, this will eventually slip into Iyyar
 *   - 2 Iyyar 7141 (Gregorian year 3381)
 * @private
 */
function getBirkatHaChama(year) {
    const leap = hdate.HDate.isLeapYear(year);
    const startMonth = leap ? ADAR_II : NISAN$1;
    const startDay = leap ? 20 : 1;
    const baseRd = hdate.HDate.hebrew2abs(year, startMonth, startDay);
    for (let day = 0; day <= 40; day++) {
        const abs = baseRd + day;
        const elapsed = abs + 1373429;
        if (elapsed % 10227 === 172) {
            return abs;
        }
    }
    return 0;
}
/**
 * Returns an array of holidays for the year
 * @param year Hebrew year
 * @param il use the Israeli schedule for holidays
 */
function getHolidaysForYearArray(year, il) {
    const yearMap = getHolidaysForYear_(year);
    const startAbs = hdate.HDate.hebrew2abs(year, TISHREI$1, 1);
    const endAbs = hdate.HDate.hebrew2abs(year + 1, TISHREI$1, 1) - 1;
    let events = [];
    const myFilter = il ? observedInIsrael : observedInDiaspora;
    for (let absDt = startAbs; absDt <= endAbs; absDt++) {
        const hd = new hdate.HDate(absDt);
        const holidays = yearMap.get(hd.toString());
        if (holidays) {
            const filtered = holidays.filter(myFilter);
            events = events.concat(filtered);
        }
    }
    return events;
}

const mevarchimChodeshStr = 'Shabbat Mevarchim Chodesh';
/** Represents Mevarchim haChodesh, the announcement of the new month */
class MevarchimChodeshEvent extends Event {
    /**
     * Constructs Mevarchim haChodesh event
     * @param date Hebrew date event occurs
     * @param monthName Hebrew month name (not translated)
     * @param [memo]
     */
    constructor(date, monthName, memo) {
        super(date, `${mevarchimChodeshStr} ${monthName}`, flags.SHABBAT_MEVARCHIM);
        this.monthName = monthName;
        if (memo) {
            this.memo = memo;
        }
        else {
            const hyear = date.getFullYear();
            const hmonth = date.getMonth();
            const monNext = hmonth === hdate.HDate.monthsInYear(hyear) ? hdate.months.NISAN : hmonth + 1;
            const molad = new Molad(hyear, monNext);
            this.memo = molad.render('en', { hour12: false });
        }
    }
    basename() {
        return this.getDesc();
    }
    /**
     * Returns (translated) description of this event
     * @param [locale] Optional locale name (defaults to active locale).
     */
    render(locale) {
        const monthName0 = hdate.Locale.gettext(this.monthName, locale);
        const monthName = monthName0.replace(/'/g, '’');
        return hdate.Locale.gettext(mevarchimChodeshStr, locale) + ' ' + monthName;
    }
    /**
     * Returns (translated) description of this event
     * @param [locale] Optional locale name (defaults to active locale).
     */
    renderBrief(locale) {
        const str = this.render(locale);
        const space = str.indexOf(' ');
        return str.substring(space + 1);
    }
}

const cals = new Map();
/**
 * Plug-ins for daily learning calendars such as Daf Yomi, Mishna Yomi, Nach Yomi, etc.
 *
 * Learning schedules are provided by the `@hebcal/learning` package.
 */
class DailyLearning {
    /**
     * Register a new learning calendar.
     * @param name case insensitive
     * @param calendar a function that returns an `Event` or `null`
     * @param startDate the first date for which this calendar is valid
     */
    static addCalendar(name, calendar, startDate) {
        if (typeof calendar !== 'function') {
            throw new TypeError(`Invalid calendar function: ${calendar}`);
        }
        cals.set(name.toLowerCase(), {
            fn: calendar,
            startDate: startDate,
        });
    }
    /**
     * Returns an event from daily calendar for a given date. Returns `null` if there
     * is no learning from this calendar on this date.
     * @param name case insensitive
     * @param hd Hebrew Date
     * @param il true for Israel, false for Diaspora
     */
    static lookup(name, hd, il) {
        const cal = cals.get(name.toLowerCase());
        if (typeof cal === 'object') {
            return cal.fn(hd, il);
        }
        return null;
    }
    static getStartDate(name) {
        const cal = cals.get(name.toLowerCase());
        if (typeof cal === 'object') {
            return cal.startDate;
        }
        return undefined;
    }
    /**
     * Tests to see if learning calendar has been registered
     * @param name case insensitive
     */
    static has(name) {
        return cals.has(name.toLowerCase());
    }
    /** Returns the names of all calendars registered */
    static getCalendars() {
        return Array.from(cals.keys());
    }
}

const NONE$1 = 0;
const HALF = 1;
const WHOLE = 2;
/**
 * @private
 */
function hallel_(events, hdate$1) {
    const whole = events
        .filter(ev => {
        const desc = ev.getDesc();
        const hd = ev.getDate();
        const month = hd.getMonth();
        const mday = hd.getDate();
        return (desc.startsWith('Chanukah') ||
            desc.startsWith('Shavuot') ||
            desc.startsWith('Sukkot') ||
            (month === hdate.months.NISAN &&
                (mday === 15 || mday === 16) &&
                ev.getFlags() & flags.CHAG) || // Pesach
            desc === "Yom HaAtzma'ut" ||
            desc === 'Yom Yerushalayim');
    })
        .map(ev => {
        return ev.getDate().abs();
    });
    const abs = hdate$1.abs();
    if (whole.includes(abs)) {
        return WHOLE;
    }
    const half = events
        .filter(ev => {
        const desc = ev.getDesc();
        return (ev.getFlags() & flags.ROSH_CHODESH ||
            (desc.startsWith('Pesach') &&
                desc !== 'Pesach I' &&
                desc !== 'Pesach II'));
    })
        .map(ev => {
        return ev.getDate().abs();
    });
    if (half.includes(abs)) {
        return HALF;
    }
    return NONE$1;
}

function range(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}
const NONE = {
    shacharit: false,
    mincha: false,
    allCongs: false,
};
/**
 * Return details on what Tachanun (or Tzidchatcha on Shabbat) is said on `hdate`.
 *
 * Tachanun is not said on Rosh Chodesh, the month of Nisan, Lag Baomer,
 * Rosh Chodesh Sivan until Isru Chag, Tisha B'av, 15 Av, Erev Rosh Hashanah,
 * Rosh Hashanah, Erev Yom Kippur until after Simchat Torah, Chanukah,
 * Tu B'shvat, Purim and Shushan Purim, and Purim and Shushan Purim Katan.
 *
 * In some congregations Tachanun is not said until from Rosh Chodesh Sivan
 * until 14th Sivan, Sukkot until after Rosh Chodesh Cheshvan, Pesach Sheini,
 * Yom Ha'atzmaut, and Yom Yerushalayim.
 *
 * Tachanun is not said at Mincha on days before it is not said at Shacharit.
 *
 * Tachanun is not said at Shacharit on Shabbat, but is at Mincha, usually.
 */
function tachanun(hdate, il) {
    return tachanun0(hdate, il, true);
}
function tachanun0(hdate$1, il, checkNext) {
    const year = hdate$1.yy;
    const dates = tachanunYear(year, il);
    const abs = hdate$1.abs();
    if (dates.none.indexOf(abs) > -1) {
        return NONE;
    }
    const dow = hdate$1.getDay();
    const ret = {
        shacharit: false,
        mincha: false,
        allCongs: false,
    };
    if (dates.some.indexOf(abs) === -1) {
        ret.allCongs = true;
    }
    if (dow !== 6) {
        ret.shacharit = true;
    }
    const tomorrow = abs + 1;
    if (checkNext && dates.yesPrev.indexOf(tomorrow) === -1) {
        const tmp = tachanun0(new hdate.HDate(tomorrow), il, false);
        ret.mincha = tmp.shacharit;
    }
    else {
        ret.mincha = dow !== 5;
    }
    if (ret.allCongs && !ret.mincha && !ret.shacharit) {
        return NONE;
    }
    return ret;
}
function tachanunYear(year, il) {
    const leap = hdate.HDate.isLeapYear(year);
    const monthsInYear = hdate.HDate.monthsInYear(year);
    let av9dt = new hdate.HDate(9, hdate.months.AV, year);
    if (av9dt.getDay() === 6) {
        av9dt = av9dt.next();
    }
    let shushPurim = new hdate.HDate(15, hdate.months.ADAR_II, year);
    if (shushPurim.getDay() === 6) {
        shushPurim = shushPurim.next();
    }
    const none = [
        new hdate.HDate(2, hdate.months.TISHREI, year), // Rosh Hashana II
    ].concat(
    // Rosh Chodesh - 1st of every month. Also includes RH day 1 (1 Tishrei)
    range(1, monthsInYear).map(month => new hdate.HDate(1, month, year)), 
    // Rosh Chodesh - 30th of months that have one
    range(1, monthsInYear)
        .filter(month => hdate.HDate.daysInMonth(month, year) === 30)
        .map(month => new hdate.HDate(30, month, year)), 
    // entire month of Nisan
    range(1, hdate.HDate.daysInMonth(hdate.months.NISAN, year)).map(mday => new hdate.HDate(mday, hdate.months.NISAN, year)), new hdate.HDate(18, hdate.months.IYYAR, year), // Lag BaOmer
    // Rosh Chodesh Sivan thru Isru Chag
    range(1, 8 - (il ? 1 : 0)).map(mday => new hdate.HDate(mday, hdate.months.SIVAN, year)), av9dt, // Tisha B'Av
    new hdate.HDate(15, hdate.months.AV, year), // Tu B'Av
    new hdate.HDate(29, hdate.months.ELUL, year), // Erev Rosh Hashanah
    // Erev Yom Kippur thru Isru Chag
    range(9, 24 - (il ? 1 : 0)).map(mday => new hdate.HDate(mday, hdate.months.TISHREI, year)), 
    // Chanukah
    range(25, 33).map(mday => new hdate.HDate(mday, hdate.months.KISLEV, year)), new hdate.HDate(15, hdate.months.SHVAT, year), // Tu BiShvat
    new hdate.HDate(14, hdate.months.ADAR_II, year), // Purim
    shushPurim, leap ? new hdate.HDate(14, hdate.months.ADAR_I, year) : [] // Purim Katan
    );
    const some = [
        new hdate.HDate(14, hdate.months.IYYAR, year), // Pesach Sheini
    ].concat(
    // Until 14 Sivan
    range(1, 13).map(mday => new hdate.HDate(mday, hdate.months.SIVAN, year)), 
    // Until after Rosh Chodesh Cheshvan
    range(20, 31).map(mday => new hdate.HDate(mday, hdate.months.TISHREI, year)), 
    // Yom HaAtzma'ut, which changes based on day of week
    year >= 5708 ? dateYomHaZikaron(year).next() : [], 
    // Yom Yerushalayim
    year >= 5727 ? new hdate.HDate(28, hdate.months.IYYAR, year) : []);
    const yesPrev = [
        new hdate.HDate(29, hdate.months.ELUL, year - 1), // Erev Rosh Hashanah
        new hdate.HDate(9, hdate.months.TISHREI, year), // Erev Yom Kippur
        new hdate.HDate(14, hdate.months.IYYAR, year), // Pesach Sheini
    ];
    return {
        none: none.map(hd => hd.abs()).sort((a, b) => a - b),
        some: some.map(hd => hd.abs()).sort((a, b) => a - b),
        yesPrev: yesPrev.map(hd => hd.abs()).sort((a, b) => a - b),
    };
}

const TISHREI = hdate.months.TISHREI;
/**
 * Gets the R.D. days for a number, Date, or HDate
 * @private
 */
function getAbs(d) {
    if (typeof d === 'number')
        return d;
    if (hdate.isDate(d))
        return hdate.greg2abs(d);
    if (hdate.HDate.isHDate(d))
        return d.abs();
    throw new TypeError(`Invalid date type: ${d}`);
}
function getYear(options) {
    if (typeof options.year !== 'undefined') {
        return Number(options.year);
    }
    return options.isHebrewYear
        ? new hdate.HDate().getFullYear()
        : new Date().getFullYear();
}
/**
 * Parse options object to determine start & end days
 * @private
 */
function getStartAndEnd(options) {
    if ((options.start && !options.end) || (options.end && !options.start)) {
        throw new TypeError('Both options.start and options.end are required');
    }
    else if (options.start && options.end) {
        return [getAbs(options.start), getAbs(options.end)];
    }
    const isHebrewYear = Boolean(options.isHebrewYear);
    const theYear = getYear(options);
    if (isNaN(theYear)) {
        throw new RangeError(`Invalid year ${options.year}`);
    }
    else if (isHebrewYear && theYear < 1) {
        throw new RangeError(`Invalid Hebrew year ${theYear}`);
    }
    const theMonth = getMonth(options);
    const numYears = Number(options.numYears) || 1;
    if (isHebrewYear) {
        return startEndHebrew(theMonth, theYear, numYears);
    }
    else {
        return startEndGregorian(theMonth, theYear, numYears);
    }
}
function getMonth(options) {
    if (options.month) {
        if (options.isHebrewYear) {
            return hdate.HDate.monthNum(options.month);
        }
        else if (typeof options.month === 'number') {
            return options.month;
        }
    }
    return NaN;
}
function startEndGregorian(theMonth, theYear, numYears) {
    const gregMonth = theMonth ? theMonth - 1 : 0;
    const startGreg = new Date(theYear, gregMonth, 1);
    if (theYear < 100) {
        startGreg.setFullYear(theYear);
    }
    const startAbs = hdate.greg2abs(startGreg);
    let endAbs;
    if (theMonth) {
        endAbs = startAbs + hdate.daysInGregMonth(theMonth, theYear) - 1;
    }
    else {
        const endYear = theYear + numYears;
        const endGreg = new Date(endYear, 0, 1);
        if (endYear < 100) {
            endGreg.setFullYear(endYear);
        }
        endAbs = hdate.greg2abs(endGreg) - 1;
    }
    return [startAbs, endAbs];
}
function startEndHebrew(theMonth, theYear, numYears) {
    const startDate = new hdate.HDate(1, theMonth || TISHREI, theYear);
    let startAbs = startDate.abs();
    const endAbs = theMonth
        ? startAbs + startDate.daysInMonth()
        : new hdate.HDate(1, TISHREI, theYear + numYears).abs() - 1;
    // for full Hebrew year, start on Erev Rosh Hashana which
    // is technically in the previous Hebrew year
    // (but conveniently lets us get candle-lighting time for Erev)
    if (!theMonth && theYear > 1) {
        startAbs--;
    }
    return [startAbs, endAbs];
}

/**
 * Calculates holidays and other Hebrew calendar events based on {@link CalOptions}.
 *
 * Each holiday is represented by an {@link Event} object which includes a date,
 * a description, flags and optional attributes.
 * If given no options, returns holidays for the Diaspora for the current Gregorian year.
 *
 * The date range returned by this function can be controlled by:
 * * `options.year` - Gregorian (e.g. 1993) or Hebrew year (e.g. 5749)
 * * `options.isHebrewYear` - to interpret `year` as Hebrew year
 * * `options.numYears` - generate calendar for multiple years (default 1)
 * * `options.month` - Gregorian or Hebrew month (to filter results to a single month)
 *
 * Alternatively, specify start and end days with `Date` or {@link HDate} instances:
 * * `options.start` - use specific start date (requires `end` date)
 * * `options.end` - use specific end date (requires `start` date)
 *
 * Unless `options.noHolidays == true`, default holidays include:
 * * Major holidays - Rosh Hashana, Yom Kippur, Pesach, Sukkot, etc.
 * * Minor holidays - Purim, Chanukah, Tu BiShvat, Lag BaOmer, etc.
 * * Minor fasts - Ta'anit Esther, Tzom Gedaliah, etc. (unless `options.noMinorFast`)
 * * Special Shabbatot - Shabbat Shekalim, Zachor, etc. (unless `options.noSpecialShabbat`)
 * * Modern Holidays - Yom HaShoah, Yom HaAtzma'ut, etc. (unless `options.noModern`)
 * * Rosh Chodesh (unless `options.noRoshChodesh`)
 *
 * Holiday and Torah reading schedules differ between Israel and the Disapora.
 * Set `options.il=true` to use the Israeli schedule.
 *
 * Additional non-default event types can be specified:
 * * Parashat HaShavua - weekly Torah Reading on Saturdays (`options.sedrot`)
 * * Counting of the Omer (`options.omer`)
 * * Shabbat Mevarchim HaChodesh on Saturday before Rosh Chodesh (`options.shabbatMevarchim`)
 * * Molad announcement on Saturday before Rosh Chodesh (`options.molad`)
 * * Yom Kippur Katan (`options.yomKippurKatan`)
 * * Yizkor (`options.yizkor`)
 *
 * Daily Study of texts are supported by the
 * {@link https://github.com/hebcal/hebcal-learning @hebcal/learning} package,
 * for example:
 * * Babylonian Talmud Daf Yomi (`options.dailyLearning.dafYomi`)
 * * Jerusalem Talmud (Yerushalmi) Yomi (`options.dailyLearning.yerushalmi`)
 * * Mishna Yomi (`options.dailyLearning.mishnaYomi`)
 * * Nach Yomi (`options.dailyLearning.nachYomi`)
 *
 * Candle-lighting and Havdalah times are approximated using latitude and longitude
 * specified by the {@link Location} class. The `Location` class contains a small
 * database of cities with their associated geographic information and time-zone information.
 * If you ever have any doubts about Hebcal's times, consult your local halachic authority.
 * If you enter geographic coordinates above the arctic circle or antarctic circle,
 * the times are guaranteed to be wrong.
 *
 * To add candle-lighting options, set `options.candlelighting=true` and set
 * `options.location` to an instance of `Location`. By default, candle lighting
 * time is 18 minutes before sundown (40 minutes for Jerusalem,
 * 30 minutes for Haifa and Zikhron Ya'akov) and Havdalah is
 * calculated according to Tzeit Hakochavim - Nightfall (the point when 3 small stars
 * are observable in the night time sky with the naked eye). The default Havdalah
 * option (Tzeit Hakochavim) is calculated when the sun is 8.5° below the horizon.
 * These defaults can be changed using these options:
 * * `options.candleLightingMins` - minutes before sundown to light candles
 * * `options.havdalahMins` - minutes after sundown for Havdalah (typical values are 42, 50, or 72).
 *    Havdalah times are suppressed when `options.havdalahMins=0`.
 * * `options.havdalahDeg` - degrees for solar depression for Havdalah.
 *    Default is 8.5 degrees for 3 small stars. Use 7.083 degrees for 3 medium-sized stars.
 *    Havdalah times are suppressed when `options.havdalahDeg=0`.
 *
 * If both `options.candlelighting=true` and `options.location` is specified,
 * Chanukah candle-lighting times and minor fast start/end times will also be generated.
 * Chanukah candle-lighting is at Bein HaShmashos (13.5 minutes before
 * the sun is 7.083° below the horizon in the evening)
 * on weekdays, at regular candle-lighting time on Fridays, and at regular Havdalah time on
 * Saturday night (see above).
 *
 * Minor fasts begin at Alot HaShachar (sun is 16.1° below the horizon in the morning) and
 * end when 3 medium-sized stars are observable in the night sky (sun is 7.083° below the horizon
 * in the evening).
 *
 * Two options also exist for generating an Event with the Hebrew date:
 * * `options.addHebrewDates` - print the Hebrew date for the entire date range
 * * `options.addHebrewDatesForEvents` - print the Hebrew date for dates with some events
 *
 * Lastly, translation and transliteration of event titles is controlled by
 * `options.locale` and the {@link Locale} API.
 * `@hebcal/core` supports three locales by default:
 * * `en` - default, Sephardic transliterations (e.g. "Shabbat")
 * * `ashkenazi` - Ashkenazi transliterations (e.g. "Shabbos")
 * * `he` - Hebrew (e.g. "שַׁבָּת")
 *
 * Additional locales (such as `ru` or `fr`) are supported by the
 * {@link https://github.com/hebcal/hebcal-locales @hebcal/locales} package
 *
 * @example
 * import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
 * const options: CalOptions = {
 *   year: 1981,
 *   isHebrewYear: false,
 *   candlelighting: true,
 *   location: Location.lookup('San Francisco'),
 *   sedrot: true,
 *   omer: true,
 * };
 * const events = HebrewCalendar.calendar(options);
 * for (const ev of events) {
 *   const hd = ev.getDate();
 *   const date = hd.greg();
 *   console.log(date.toLocaleDateString(), ev.render('en'), hd.toString());
 * }
 */
function calendar(options = {}) {
    options = Object.assign({}, options); // so we can modify freely
    checkCandleOptions(options);
    const location = (options.location = options.location || defaultLocation);
    const il = (options.il = options.il || location.getIsrael() || false);
    const hasUserMask = typeof options.mask === 'number';
    options.mask = getMaskFromOptions(options);
    if (options.ashkenazi || options.locale) {
        if (options.locale && typeof options.locale !== 'string') {
            throw new TypeError(`Invalid options.locale: ${options.locale}`);
        }
        const locale = options.ashkenazi ? 'ashkenazi' : options.locale;
        const translationObj = hdate.Locale.useLocale(locale);
        if (!translationObj) {
            throw new TypeError(`Locale '${locale}' not found; did you forget to import @hebcal/locales?`);
        }
    }
    else {
        hdate.Locale.useLocale('en');
    }
    const evts = [];
    let sedra;
    let holidaysYear;
    let beginOmer = -1;
    let endOmer = -1;
    let currentYear = -1;
    const startAndEnd = getStartAndEnd(options);
    warnUnrecognizedOptions(options);
    const startAbs = startAndEnd[0];
    const endAbs = startAndEnd[1];
    const startGreg = hdate.abs2greg(startAbs);
    if (startGreg.getFullYear() < 100) {
        options.candlelighting = false;
    }
    for (let abs = startAbs; abs <= endAbs; abs++) {
        const hd = new hdate.HDate(abs);
        const hyear = hd.getFullYear();
        if (hyear !== currentYear) {
            currentYear = hyear;
            holidaysYear = getHolidaysForYear_(currentYear);
            if (options.sedrot) {
                sedra = getSedra(currentYear, il);
            }
            if (options.omer) {
                beginOmer = hdate.HDate.hebrew2abs(currentYear, NISAN, 16);
                endOmer = hdate.HDate.hebrew2abs(currentYear, SIVAN, 5);
            }
        }
        const prevEventsLength = evts.length;
        const dow = hd.getDay();
        const isFriday = dow === FRI;
        const isSaturday = dow === SAT;
        let candlesEv;
        const holidays = holidaysYear.get(hd.toString()) || [];
        for (const ev of holidays) {
            candlesEv = appendHolidayAndRelated(candlesEv, evts, ev, options, isFriday, isSaturday, hasUserMask);
        }
        if (options.sedrot && isSaturday) {
            const parsha0 = sedra.lookup(abs);
            if (!parsha0.chag) {
                evts.push(new ParshaEvent(hd, parsha0.parsha, il, parsha0.num));
            }
        }
        if (options.yizkor) {
            const mm = hd.getMonth();
            const dd = hd.getDate();
            if ((mm === hdate.months.TISHREI && (dd === 10 || dd === 22)) ||
                (mm === NISAN && dd === (il ? 21 : 22)) ||
                (mm === SIVAN && dd === (il ? 6 : 7))) {
                const linkedEvent = holidays.filter(ev => ev.observedIn(il))[0];
                const ev = new Event(hd, 'Yizkor', flags.YIZKOR, {
                    emoji: '🕯️',
                    linkedEvent,
                });
                evts.push(ev);
            }
        }
        const dailyLearning = options.dailyLearning;
        if (typeof dailyLearning === 'object') {
            const events = makeDailyLearning(hd, dailyLearning, il);
            evts.push(...events);
        }
        if (options.omer && abs >= beginOmer && abs <= endOmer) {
            const omer = abs - beginOmer + 1;
            const omerEv = makeOmerEvent(hd, omer, options);
            evts.push(omerEv);
        }
        if (isSaturday && (options.molad || options.shabbatMevarchim)) {
            const events = makeMoladAndMevarchimChodesh(hd, options);
            evts.push(...events);
        }
        if (!candlesEv && options.candlelighting && (isFriday || isSaturday)) {
            candlesEv = makeCandleEvent(undefined, hd, options, isFriday, isSaturday);
            if (isFriday && candlesEv && sedra) {
                const parsha = sedra.lookup(abs);
                const pe = new ParshaEvent(hd.next(), parsha.parsha, il, parsha.num);
                candlesEv.memo = pe.render(options.locale);
            }
        }
        // suppress Havdalah when options.havdalahMins=0 or options.havdalahDeg=0
        if (candlesEv instanceof HavdalahEvent &&
            (options.havdalahMins === 0 || options.havdalahDeg === 0)) {
            candlesEv = undefined;
        }
        if (candlesEv) {
            evts.push(candlesEv);
        }
        if (options.addHebrewDates ||
            (options.addHebrewDatesForEvents && prevEventsLength !== evts.length)) {
            const e2 = new HebrewDateEvent(hd);
            if (prevEventsLength === evts.length) {
                evts.push(e2);
            }
            else {
                evts.splice(prevEventsLength, 0, e2);
            }
        }
    }
    return evts;
}
const FRI = 5;
const SAT = 6;
const NISAN = hdate.months.NISAN;
const SIVAN = hdate.months.SIVAN;
const ELUL = hdate.months.ELUL;
const LIGHT_CANDLES = flags.LIGHT_CANDLES;
const YOM_TOV_ENDS = flags.YOM_TOV_ENDS;
const CHUL_ONLY = flags.CHUL_ONLY;
const IL_ONLY = flags.IL_ONLY;
const LIGHT_CANDLES_TZEIS = flags.LIGHT_CANDLES_TZEIS;
const CHANUKAH_CANDLES = flags.CHANUKAH_CANDLES;
const MINOR_FAST = flags.MINOR_FAST;
const SPECIAL_SHABBAT = flags.SPECIAL_SHABBAT;
const MODERN_HOLIDAY = flags.MODERN_HOLIDAY;
const MAJOR_FAST = flags.MAJOR_FAST;
const ROSH_CHODESH = flags.ROSH_CHODESH;
const PARSHA_HASHAVUA = flags.PARSHA_HASHAVUA;
const DAF_YOMI = flags.DAF_YOMI;
const MISHNA_YOMI = flags.MISHNA_YOMI;
const NACH_YOMI = flags.NACH_YOMI;
const YERUSHALMI_YOMI = flags.YERUSHALMI_YOMI;
const OMER_COUNT = flags.OMER_COUNT;
const SHABBAT_MEVARCHIM = flags.SHABBAT_MEVARCHIM;
const MINOR_HOLIDAY = flags.MINOR_HOLIDAY;
const EREV = flags.EREV;
const CHOL_HAMOED = flags.CHOL_HAMOED;
const YOM_KIPPUR_KATAN = flags.YOM_KIPPUR_KATAN;
const YIZKOR = flags.YIZKOR;
const unrecognizedAlreadyWarned = new Set();
const RECOGNIZED_OPTIONS = {
    location: 1,
    year: 1,
    isHebrewYear: 1,
    month: 1,
    numYears: 1,
    start: 1,
    end: 1,
    candlelighting: 1,
    candleLightingMins: 1,
    havdalahMins: 1,
    havdalahDeg: 1,
    fastEndDeg: 1,
    sedrot: 1,
    il: 1,
    noMinorFast: 1,
    noModern: 1,
    shabbatMevarchim: 1,
    noRoshChodesh: 1,
    noSpecialShabbat: 1,
    noHolidays: 1,
    omer: 1,
    molad: 1,
    ashkenazi: 1,
    locale: 1,
    addHebrewDates: 1,
    addHebrewDatesForEvents: 1,
    mask: 1,
    yomKippurKatan: 1,
    hour12: 1,
    dailyLearning: 1,
    useElevation: 1,
    yizkor: 1,
};
/**
 * @private
 */
function warnUnrecognizedOptions(options) {
    for (const k of Object.keys(options)) {
        if (typeof RECOGNIZED_OPTIONS[k] === 'undefined' &&
            !unrecognizedAlreadyWarned.has(k)) {
            console.warn(`Ignoring unrecognized HebrewCalendar option: ${k}`);
            unrecognizedAlreadyWarned.add(k);
        }
    }
    if (options.dailyLearning) {
        for (const k of Object.keys(options.dailyLearning)) {
            if (!unrecognizedAlreadyWarned.has(k) && !DailyLearning.has(k)) {
                console.warn(`Ignoring unrecognized DailyLearning calendar: ${k}`);
                unrecognizedAlreadyWarned.add(k);
            }
        }
    }
}
const israelCityOffset = {
    Jerusalem: 40,
    Haifa: 30,
    "Zikhron Ya'aqov": 30,
    "Zikhron Ya'akov": 30,
    'Zikhron Yaakov': 30,
    "Zichron Ya'akov": 30,
    'Zichron Yaakov': 30,
};
const geoIdCandleOffset = {
    '281184': 40, // Jerusalem
    '294801': 30, // Haifa
    '293067': 30, // Zikhron Yaakov
};
/**
 * @private
 * @constant
 * This calculation is based on the position of the sun 36 minutes after sunset in Jerusalem
 * around the equinox / equilux, which is 8.5° below geometric zenith.
 * The Ohr Meir considers this the time that 3 small stars are visible,
 * which is later than the required 3 medium stars.
 * @see {https://kosherjava.com/zmanim/docs/api/com/kosherjava/zmanim/ZmanimCalendar.html#ZENITH_8_POINT_5}
 */
const TZEIT_3SMALL_STARS = 8.5;
/**
 * @private
 * @constant
 * This calculation is based on observation of 3 medium sized stars by Dr. Baruch Cohen
 * in his calendar published in in 1899 in Strasbourg, France.
 * This calculates to 7.0833333° below geometric zenith.
 * @see {https://kosherjava.com/zmanim/docs/api/com/kosherjava/zmanim/ComplexZmanimCalendar.html#ZENITH_7_POINT_083}
 */
const TZEIT_3MEDIUM_STARS = 7.0833333;
/**
 * Modifies options in-place
 * @private
 */
function checkCandleOptions(options) {
    if (!options.candlelighting) {
        return;
    }
    const location = options.location;
    if (typeof location === 'undefined' || !(location instanceof Location)) {
        throw new TypeError('options.candlelighting requires valid options.location');
    }
    if (typeof options.havdalahMins === 'number' &&
        typeof options.havdalahDeg === 'number') {
        throw new TypeError('options.havdalahMins and options.havdalahDeg are mutually exclusive');
    }
    const min0 = options.candleLightingMins;
    let min = typeof min0 === 'number' && !isNaN(min0) ? Math.trunc(min0) : 18;
    if (location.getIsrael() && Math.abs(min) === 18) {
        min = overrideIsraelCandleMins(location, min);
    }
    options.candleLightingMins = -1 * Math.abs(min);
    if (typeof options.havdalahMins === 'number') {
        options.havdalahMins = Math.trunc(Math.abs(options.havdalahMins));
    }
    else if (typeof options.havdalahDeg === 'number') {
        options.havdalahDeg = Math.abs(options.havdalahDeg);
    }
    else {
        options.havdalahDeg = TZEIT_3SMALL_STARS;
    }
    if (typeof options.fastEndDeg !== 'number') {
        options.fastEndDeg = TZEIT_3MEDIUM_STARS;
    }
}
function overrideIsraelCandleMins(location, min) {
    const geoid = location.getGeoId();
    if (geoid) {
        const offset = geoIdCandleOffset[geoid];
        if (typeof offset === 'number') {
            return offset;
        }
    }
    const shortName = location.getShortName();
    if (shortName) {
        const offset = israelCityOffset[shortName];
        if (typeof offset === 'number') {
            return offset;
        }
    }
    return min;
}
/**
 * Mask to filter Holiday array
 * @private
 */
function getMaskFromOptions(options) {
    var _a;
    if (typeof options.mask === 'number') {
        return setOptionsFromMask(options);
    }
    const il = options.il || ((_a = options.location) === null || _a === undefined ? undefined : _a.getIsrael()) || false;
    let mask = 0;
    // default options
    if (!options.noHolidays) {
        mask |=
            ROSH_CHODESH |
                YOM_TOV_ENDS |
                MINOR_FAST |
                SPECIAL_SHABBAT |
                MODERN_HOLIDAY |
                MAJOR_FAST |
                MINOR_HOLIDAY |
                EREV |
                CHOL_HAMOED |
                LIGHT_CANDLES |
                LIGHT_CANDLES_TZEIS |
                CHANUKAH_CANDLES;
    }
    if (options.candlelighting) {
        mask |= LIGHT_CANDLES | LIGHT_CANDLES_TZEIS | YOM_TOV_ENDS;
    }
    // suppression of defaults
    if (options.noRoshChodesh) {
        mask &= ~ROSH_CHODESH;
    }
    if (options.noModern) {
        mask &= ~MODERN_HOLIDAY;
    }
    if (options.noMinorFast) {
        mask &= ~MINOR_FAST;
    }
    if (options.noSpecialShabbat) {
        mask &= ~SPECIAL_SHABBAT;
        mask &= ~SHABBAT_MEVARCHIM;
    }
    if (il) {
        mask |= IL_ONLY;
    }
    else {
        mask |= CHUL_ONLY;
    }
    // non-default options
    if (options.sedrot) {
        mask |= PARSHA_HASHAVUA;
    }
    if (options.omer) {
        mask |= OMER_COUNT;
    }
    if (options.shabbatMevarchim) {
        mask |= SHABBAT_MEVARCHIM;
    }
    if (options.yomKippurKatan) {
        mask |= YOM_KIPPUR_KATAN;
    }
    if (options.yizkor) {
        mask |= YIZKOR;
    }
    if (options.dailyLearning) {
        const dailyLearning = options.dailyLearning;
        if (dailyLearning.dafYomi) {
            mask |= DAF_YOMI;
        }
        if (dailyLearning.mishnaYomi) {
            mask |= MISHNA_YOMI;
        }
        if (dailyLearning.nachYomi) {
            mask |= NACH_YOMI;
        }
        if (dailyLearning.yerushalmi) {
            mask |= YERUSHALMI_YOMI;
        }
    }
    return mask;
}
const MASK_LIGHT_CANDLES = LIGHT_CANDLES | LIGHT_CANDLES_TZEIS | CHANUKAH_CANDLES | YOM_TOV_ENDS;
const defaultLocation = new Location(0, 0, false, 'UTC');
/**
 * @private
 */
function setOptionsFromMask(options) {
    const m = options.mask || 0;
    if (m & ROSH_CHODESH)
        delete options.noRoshChodesh;
    if (m & MODERN_HOLIDAY)
        delete options.noModern;
    if (m & MINOR_FAST)
        delete options.noMinorFast;
    if (m & SPECIAL_SHABBAT)
        delete options.noSpecialShabbat;
    if (m & PARSHA_HASHAVUA)
        options.sedrot = true;
    if (m & (DAF_YOMI | MISHNA_YOMI | NACH_YOMI | YERUSHALMI_YOMI)) {
        options.dailyLearning = options.dailyLearning || {};
        if (m & DAF_YOMI) {
            options.dailyLearning.dafYomi = true;
        }
        if (m & MISHNA_YOMI) {
            options.dailyLearning.mishnaYomi = true;
        }
        if (m & NACH_YOMI) {
            options.dailyLearning.nachYomi = true;
        }
        if (m & YERUSHALMI_YOMI) {
            options.dailyLearning.yerushalmi = 1;
        }
    }
    if (m & OMER_COUNT)
        options.omer = true;
    if (m & SHABBAT_MEVARCHIM)
        options.shabbatMevarchim = true;
    if (m & YOM_KIPPUR_KATAN)
        options.yomKippurKatan = true;
    if (m & YIZKOR)
        options.yizkor = true;
    return m;
}
/**
 * Appends the Event `ev` to the `events` array. Also may add related
 * timed events like candle-lighting or fast start/end
 * @private
 */
function appendHolidayAndRelated(candlesEv, events, ev, options, isFriday, isSaturday, hasUserMask) {
    const il = options.il || false;
    if (!ev.observedIn(il)) {
        return candlesEv; // holiday isn't observed here; bail out early
    }
    const eFlags = ev.getFlags();
    if ((!options.yomKippurKatan && eFlags & YOM_KIPPUR_KATAN) ||
        (options.noModern && eFlags & MODERN_HOLIDAY)) {
        return candlesEv; // bail out early
    }
    const isMajorFast = Boolean(eFlags & MAJOR_FAST);
    const isMinorFast = Boolean(eFlags & MINOR_FAST);
    let fastEv;
    if (options.candlelighting &&
        (isMajorFast || isMinorFast) &&
        ev.getDesc() !== 'Yom Kippur') {
        ev = fastEv = makeFastStartEnd(ev, options);
        if (fastEv.startEvent &&
            (isMajorFast || (isMinorFast && !options.noMinorFast))) {
            events.push(fastEv.startEvent);
        }
    }
    if (eFlags & Number(options.mask) || (!eFlags && !hasUserMask)) {
        if (options.candlelighting && eFlags & MASK_LIGHT_CANDLES) {
            const hd = ev.getDate();
            candlesEv = makeCandleEvent(ev, hd, options, isFriday, isSaturday);
            if (eFlags & CHANUKAH_CANDLES && candlesEv && !options.noHolidays) {
                // Replace Chanukah event with a clone that includes candle lighting time.
                // For clarity, allow a "duplicate" candle lighting event to remain for Shabbat
                const chanukahEv = makeWeekdayChanukahCandleLighting(ev, hd, options);
                if (chanukahEv) {
                    if (isFriday || isSaturday) {
                        chanukahEv.eventTime = candlesEv.eventTime;
                        chanukahEv.eventTimeStr = candlesEv.eventTimeStr;
                    }
                    ev = chanukahEv;
                }
                candlesEv = undefined;
            }
        }
        if (!options.noHolidays ||
            (options.yomKippurKatan && eFlags & YOM_KIPPUR_KATAN)) {
            events.push(ev); // the original event itself
        }
    }
    if ((isMajorFast || (isMinorFast && !options.noMinorFast)) &&
        fastEv &&
        fastEv.endEvent) {
        events.push(fastEv.endEvent);
    }
    return candlesEv;
}
function makeMoladAndMevarchimChodesh(hd, options) {
    const evts = [];
    const hmonth = hd.getMonth();
    const hdate$1 = hd.getDate();
    if (hmonth !== ELUL && hdate$1 >= 23 && hdate$1 <= 29) {
        const hyear = hd.getFullYear();
        const monNext = hmonth === hdate.HDate.monthsInYear(hyear) ? NISAN : hmonth + 1;
        if (options.molad) {
            evts.push(new MoladEvent(hd, hyear, monNext, options));
        }
        if (options.shabbatMevarchim) {
            const nextMonthName = hdate.HDate.getMonthName(monNext, hyear);
            const molad = new Molad(hyear, monNext);
            const memo = molad.render(options.locale || 'en', options);
            evts.push(new MevarchimChodeshEvent(hd, nextMonthName, memo));
        }
    }
    return evts;
}
function dailyLearningName(key, val) {
    if (key === 'yerushalmi') {
        return val === 2 ? 'yerushalmi-schottenstein' : 'yerushalmi-vilna';
    }
    return key;
}
function makeDailyLearning(hd, dailyLearning, il) {
    const evts = [];
    for (const [key, val] of Object.entries(dailyLearning)) {
        if (val) {
            const name = dailyLearningName(key, val);
            const learningEv = DailyLearning.lookup(name, hd, il);
            if (learningEv) {
                evts.push(learningEv);
            }
        }
    }
    return evts;
}
function makeOmerEvent(hd, omerDay, options) {
    const omerEv = new OmerEvent(hd, omerDay);
    if (options.candlelighting) {
        const location = options.location;
        const zmanim = new Zmanim(location, hd.prev(), false);
        const tzeit = zmanim.tzeit(7.0833);
        if (!isNaN(tzeit.getTime())) {
            omerEv.alarm = tzeit;
        }
    }
    return omerEv;
}

/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * HebrewCalendar is the main interface to the `@hebcal/core` library.
 * This namespace is used to calculate holidays, rosh chodesh, candle lighting & havdalah times,
 * Parashat HaShavua, Daf Yomi, days of the omer, and the molad.
 * Event names can be rendered in several languges using the `locale` option.
 */
class HebrewCalendar {
    constructor() { }
    /**
     * Calculates holidays and other Hebrew calendar events based on {@link CalOptions}.
     *
     * Each holiday is represented by an {@link Event} object which includes a date,
     * a description, flags and optional attributes.
     * If given no options, returns holidays for the Diaspora for the current Gregorian year.
     *
     * The date range returned by this function can be controlled by:
     * * `options.year` - Gregorian (e.g. 1993) or Hebrew year (e.g. 5749)
     * * `options.isHebrewYear` - to interpret `year` as Hebrew year
     * * `options.numYears` - generate calendar for multiple years (default 1)
     * * `options.month` - Gregorian or Hebrew month (to filter results to a single month)
     *
     * Alternatively, specify start and end days with `Date` or {@link HDate} instances:
     * * `options.start` - use specific start date (requires `end` date)
     * * `options.end` - use specific end date (requires `start` date)
     *
     * Unless `options.noHolidays == true`, default holidays include:
     * * Major holidays - Rosh Hashana, Yom Kippur, Pesach, Sukkot, etc.
     * * Minor holidays - Purim, Chanukah, Tu BiShvat, Lag BaOmer, etc.
     * * Minor fasts - Ta'anit Esther, Tzom Gedaliah, etc. (unless `options.noMinorFast`)
     * * Special Shabbatot - Shabbat Shekalim, Zachor, etc. (unless `options.noSpecialShabbat`)
     * * Modern Holidays - Yom HaShoah, Yom HaAtzma'ut, etc. (unless `options.noModern`)
     * * Rosh Chodesh (unless `options.noRoshChodesh`)
     *
     * Holiday and Torah reading schedules differ between Israel and the Disapora.
     * Set `options.il=true` to use the Israeli schedule.
     *
     * Additional non-default event types can be specified:
     * * Parashat HaShavua - weekly Torah Reading on Saturdays (`options.sedrot`)
     * * Counting of the Omer (`options.omer`)
     * * Shabbat Mevarchim HaChodesh on Saturday before Rosh Chodesh (`options.shabbatMevarchim`)
     * * Molad announcement on Saturday before Rosh Chodesh (`options.molad`)
     * * Yom Kippur Katan (`options.yomKippurKatan`)
     * * Yizkor (`options.yizkor`)
     *
     * Daily Study of texts are supported by the
     * {@link https://github.com/hebcal/hebcal-learning @hebcal/learning} package,
     * for example:
     * * Babylonian Talmud Daf Yomi (`options.dailyLearning.dafYomi`)
     * * Jerusalem Talmud (Yerushalmi) Yomi (`options.dailyLearning.yerushalmi`)
     * * Mishna Yomi (`options.dailyLearning.mishnaYomi`)
     * * Nach Yomi (`options.dailyLearning.nachYomi`)
     *
     * Candle-lighting and Havdalah times are approximated using latitude and longitude
     * specified by the {@link Location} class. The `Location` class contains a small
     * database of cities with their associated geographic information and time-zone information.
     * If you ever have any doubts about Hebcal's times, consult your local halachic authority.
     * If you enter geographic coordinates above the arctic circle or antarctic circle,
     * the times are guaranteed to be wrong.
     *
     * To add candle-lighting options, set `options.candlelighting=true` and set
     * `options.location` to an instance of `Location`. By default, candle lighting
     * time is 18 minutes before sundown (40 minutes for Jerusalem,
     * 30 minutes for Haifa and Zikhron Ya'akov) and Havdalah is
     * calculated according to Tzeit Hakochavim - Nightfall (the point when 3 small stars
     * are observable in the night time sky with the naked eye). The default Havdalah
     * option (Tzeit Hakochavim) is calculated when the sun is 8.5° below the horizon.
     * These defaults can be changed using these options:
     * * `options.candleLightingMins` - minutes before sundown to light candles
     * * `options.havdalahMins` - minutes after sundown for Havdalah (typical values are 42, 50, or 72).
     *    Havdalah times are suppressed when `options.havdalahMins=0`.
     * * `options.havdalahDeg` - degrees for solar depression for Havdalah.
     *    Default is 8.5 degrees for 3 small stars. Use 7.083 degrees for 3 medium-sized stars.
     *    Havdalah times are suppressed when `options.havdalahDeg=0`.
     *
     * If both `options.candlelighting=true` and `options.location` is specified,
     * Chanukah candle-lighting times and minor fast start/end times will also be generated.
     * Chanukah candle-lighting is at Bein HaShmashos (13.5 minutes before
     * the sun is 7.083° below the horizon in the evening)
     * on weekdays, at regular candle-lighting time on Fridays, and at regular Havdalah time on
     * Saturday night (see above).
     *
     * Minor fasts begin at Alot HaShachar (sun is 16.1° below the horizon in the morning) and
     * end when 3 medium-sized stars are observable in the night sky (sun is 7.083° below the horizon
     * in the evening).
     *
     * Two options also exist for generating an Event with the Hebrew date:
     * * `options.addHebrewDates` - print the Hebrew date for the entire date range
     * * `options.addHebrewDatesForEvents` - print the Hebrew date for dates with some events
     *
     * Lastly, translation and transliteration of event titles is controlled by
     * `options.locale` and the {@link Locale} API.
     * `@hebcal/core` supports three locales by default:
     * * `en` - default, Sephardic transliterations (e.g. "Shabbat")
     * * `ashkenazi` - Ashkenazi transliterations (e.g. "Shabbos")
     * * `he` - Hebrew (e.g. "שַׁבָּת")
     *
     * Additional locales (such as `ru` or `fr`) are supported by the
     * {@link https://github.com/hebcal/hebcal-locales @hebcal/locales} package
     *
     * @example
     * import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
     * const options: CalOptions = {
     *   year: 1981,
     *   isHebrewYear: false,
     *   candlelighting: true,
     *   location: Location.lookup('San Francisco'),
     *   sedrot: true,
     *   omer: true,
     * };
     * const events = HebrewCalendar.calendar(options);
     * for (const ev of events) {
     *   const hd = ev.getDate();
     *   const date = hd.greg();
     *   console.log(date.toLocaleDateString(), ev.render('en'), hd.toString());
     * }
     */
    static calendar(options = {}) {
        return calendar(options);
    }
    /**
     * Calculates a birthday or anniversary (non-yahrzeit).
     * `hyear` must be after original `gdate` of anniversary.
     * Returns `undefined` when requested year preceeds or is same as original year.
     *
     * Hebcal uses the algorithm defined in "Calendrical Calculations"
     * by Edward M. Reingold and Nachum Dershowitz.
     *
     * The birthday of someone born in Adar of an ordinary year or Adar II of
     * a leap year is also always in the last month of the year, be that Adar
     * or Adar II. The birthday in an ordinary year of someone born during the
     * first 29 days of Adar I in a leap year is on the corresponding day of Adar;
     * in a leap year, the birthday occurs in Adar I, as expected.
     *
     * Someone born on the thirtieth day of Marcheshvan, Kislev, or Adar I
     * has his birthday postponed until the first of the following month in
     * years where that day does not occur. [Calendrical Calculations p. 111]
     * @example
     * import {HebrewCalendar} from '@hebcal/core';
     * const dt = new Date(2014, 2, 2); // '2014-03-02' == '30 Adar I 5774'
     * const hd = HebrewCalendar.getBirthdayOrAnniversary(5780, dt); // '1 Nisan 5780'
     * console.log(hd.greg().toLocaleDateString('en-US')); // '3/26/2020'
     * @param hyear Hebrew year
     * @param gdate Gregorian or Hebrew date of event
     * @returns anniversary occurring in `hyear`
     */
    static getBirthdayOrAnniversary(hyear, gdate) {
        const dt = hdate.getBirthdayHD(hyear, gdate);
        if (typeof dt === 'undefined') {
            return dt;
        }
        return new hdate.HDate(dt);
    }
    /**
     * Calculates yahrzeit.
     * `hyear` must be after original `gdate` of death.
     * Returns `undefined` when requested year preceeds or is same as original year.
     *
     * Hebcal uses the algorithm defined in "Calendrical Calculations"
     * by Edward M. Reingold and Nachum Dershowitz.
     *
     * The customary anniversary date of a death is more complicated and depends
     * also on the character of the year in which the first anniversary occurs.
     * There are several cases:
     *
     * * If the date of death is Marcheshvan 30, the anniversary in general depends
     *   on the first anniversary; if that first anniversary was not Marcheshvan 30,
     *   use the day before Kislev 1.
     * * If the date of death is Kislev 30, the anniversary in general again depends
     *   on the first anniversary — if that was not Kislev 30, use the day before
     *   Tevet 1.
     * * If the date of death is Adar II, the anniversary is the same day in the
     *   last month of the Hebrew year (Adar or Adar II).
     * * If the date of death is Adar I 30, the anniversary in a Hebrew year that
     *   is not a leap year (in which Adar only has 29 days) is the last day in
     *   Shevat.
     * * In all other cases, use the normal (that is, same month number) anniversary
     *   of the date of death. [Calendrical Calculations p. 113]
     * @example
     * import {HebrewCalendar} from '@hebcal/core';
     * const dt = new Date(2014, 2, 2); // '2014-03-02' == '30 Adar I 5774'
     * const hd = HebrewCalendar.getYahrzeit(5780, dt); // '30 Sh\'vat 5780'
     * console.log(hd.greg().toLocaleDateString('en-US')); // '2/25/2020'
     * @param hyear Hebrew year
     * @param gdate Gregorian or Hebrew date of death
     * @returns anniversary occurring in hyear
     */
    static getYahrzeit(hyear, gdate) {
        const dt = hdate.getYahrzeitHD(hyear, gdate);
        if (typeof dt === 'undefined') {
            return dt;
        }
        return new hdate.HDate(dt);
    }
    /**
     * Lower-level holidays interface, which returns a `Map` of `Event`s indexed by
     * `HDate.toString()`. These events must filtered especially for `flags.IL_ONLY`
     * or `flags.CHUL_ONLY` depending on Israel vs. Diaspora holiday scheme.
     * @param year Hebrew year
     */
    static getHolidaysForYear(year) {
        return getHolidaysForYear_(year);
    }
    /**
     * Returns an array of holidays for the year
     * @param year Hebrew year
     * @param il use the Israeli schedule for holidays
     */
    static getHolidaysForYearArray(year, il) {
        return getHolidaysForYearArray(year, il);
    }
    /**
     * Returns an array of Events on this date (or `undefined` if no events)
     * @param date Hebrew Date, Gregorian date, or absolute R.D. day number
     * @param [il] use the Israeli schedule for holidays
     */
    static getHolidaysOnDate(date, il) {
        return getHolidaysOnDate(date, il);
    }
    /**
     * Eruv Tavshilin
     */
    static eruvTavshilin(date, il) {
        if (date.getDay() < 3 || date.getDay() > 4) {
            return false;
        }
        const today = new hdate.HDate(date);
        const friday = today.after(5);
        const tomorrow = today.next();
        if (!isChag(friday, il) || isChag(today, il) || !isChag(tomorrow, il)) {
            return false;
        }
        return true;
    }
    /**
     * Helper function to format a 23-hour (00:00-23:59) time in US format ("8:13pm") or
     * keep as "20:13" for any other locale/country. Uses {@link CalOptions} to determine
     * locale.
     * If `options.hour12` is `false`, locale is ignored and always returns 24-hour time.
     * If `options.hour12` is `true`, locale is ignored and always returns 12-hour time.
     * @param timeStr - original time like "20:30"
     * @param suffix - "p" or "pm" or " P.M.". Add leading space if you want it
     * @param options
     */
    static reformatTimeStr(timeStr, suffix, options) {
        return reformatTimeStr(timeStr, suffix, options);
    }
    static version() {
        return version;
    }
    /**
     * Convenience function to create an instance of `Sedra` or reuse a previously
     * created and cached instance.
     */
    static getSedra(hyear, il) {
        return getSedra(hyear, il);
    }
    /**
     * Return a number containing information on what Hallel is said on that day.
     *
     * Whole Hallel is said on Chanukah, the first Yom Tov of Pesach, Shavuot, Sukkot,
     * Yom Ha'atzmaut, and Yom Yerushalayim.
     *
     * Half Hallel is said on Rosh Chodesh (not Rosh Hashanah), and the last 6 days of Pesach.
     *
     * The number is one of the following values:
     *
     * 0 - No Hallel
     * 1 - Half Hallel
     * 2 - Whole Hallel
     */
    static hallel(hdate, il) {
        const events = getHolidaysForYearArray(hdate.getFullYear(), il);
        return hallel_(events, hdate);
    }
    /**
     * Return details on what Tachanun (or Tzidchatcha on Shabbat) is said on `hdate`.
     *
     * Tachanun is not said on Rosh Chodesh, the month of Nisan, Lag Baomer,
     * Rosh Chodesh Sivan until Isru Chag, Tisha B'av, 15 Av, Erev Rosh Hashanah,
     * Rosh Hashanah, Erev Yom Kippur until after Simchat Torah, Chanukah,
     * Tu B'shvat, Purim and Shushan Purim, and Purim and Shushan Purim Katan.
     *
     * In some congregations Tachanun is not said until from Rosh Chodesh Sivan
     * until 14th Sivan, Sukkot until after Rosh Chodesh Cheshvan, Pesach Sheini,
     * Yom Ha'atzmaut, and Yom Yerushalayim.
     *
     * Tachanun is not said at Mincha on days before it is not said at Shacharit.
     *
     * Tachanun is not said at Shacharit on Shabbat, but is at Mincha, usually.
     */
    static tachanun(hdate, il) {
        return tachanun(hdate, il);
    }
}
/**
 * @private
 */
function isChag(date, il) {
    const events = getHolidaysOnDate(date, il) || [];
    const chag = events.filter(ev => ev.getFlags() & flags.CHAG);
    return chag.length !== 0;
}

Object.defineProperty(exports, "HDate", {
    enumerable: true,
    get: function () { return hdate.HDate; }
});
Object.defineProperty(exports, "Locale", {
    enumerable: true,
    get: function () { return hdate.Locale; }
});
Object.defineProperty(exports, "gematriya", {
    enumerable: true,
    get: function () { return hdate.gematriya; }
});
Object.defineProperty(exports, "gematriyaStrToNum", {
    enumerable: true,
    get: function () { return hdate.gematriyaStrToNum; }
});
Object.defineProperty(exports, "greg", {
    enumerable: true,
    get: function () { return hdate.greg; }
});
Object.defineProperty(exports, "months", {
    enumerable: true,
    get: function () { return hdate.months; }
});
Object.defineProperty(exports, "GeoLocation", {
    enumerable: true,
    get: function () { return noaa.GeoLocation; }
});
Object.defineProperty(exports, "NOAACalculator", {
    enumerable: true,
    get: function () { return noaa.NOAACalculator; }
});
exports.AsaraBTevetEvent = AsaraBTevetEvent;
exports.CandleLightingEvent = CandleLightingEvent;
exports.ChanukahEvent = ChanukahEvent;
exports.DailyLearning = DailyLearning;
exports.Event = Event;
exports.FastDayEvent = FastDayEvent;
exports.HavdalahEvent = HavdalahEvent;
exports.HebrewCalendar = HebrewCalendar;
exports.HebrewDateEvent = HebrewDateEvent;
exports.HolidayEvent = HolidayEvent;
exports.Location = Location;
exports.MevarchimChodeshEvent = MevarchimChodeshEvent;
exports.Molad = Molad;
exports.MoladEvent = MoladEvent;
exports.OmerEvent = OmerEvent;
exports.ParshaEvent = ParshaEvent;
exports.RoshChodeshEvent = RoshChodeshEvent;
exports.RoshHashanaEvent = RoshHashanaEvent;
exports.Sedra = Sedra;
exports.TimedChanukahEvent = TimedChanukahEvent;
exports.TimedEvent = TimedEvent;
exports.YomKippurKatanEvent = YomKippurKatanEvent;
exports.Zmanim = Zmanim;
exports.flags = flags;
exports.getHolidaysOnDate = getHolidaysOnDate;
exports.getSedra = getSedra;
exports.holidayDesc = holidayDesc;
exports.parshaYear = parshaYear;
exports.parshiot = parshiot;
exports.version = version;
//# sourceMappingURL=index.cjs.map
