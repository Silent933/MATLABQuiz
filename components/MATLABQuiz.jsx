import { useState, useMemo } from "react";

const ALL_QUESTIONS = [
  { num:1, section:"أوامر MATLAB الأساسية", text:"الأمر المستخدم في إظهار قائمة بأسماء المتحولات فقط:", options:["whos","clc","who","Sqrt"], correct:2 },
  { num:2, section:"أوامر MATLAB الأساسية", text:"تنظيم المتحولات يكون في:", options:["نافذة الأوامر","ساحة العمل","مستعرض المجلد العالي","محرر المصفوفات"], correct:1 },
  { num:3, section:"أوامر MATLAB الأساسية", text:"الأمر المستخدم في مسح محتويات نافذة الأوامر:", options:["clf","clear","clc","clear var1"], correct:2 },
  { num:4, section:"أوامر MATLAB الأساسية", text:"في حال عدم إسناد خرج أي عملية حسابية فإن ماتلاب يسند تلقائياً للمتحول:", options:["Conv","Deconv","Ans","Sum"], correct:2 },
  { num:5, section:"أوامر MATLAB الأساسية", text:"يمكن منع إظهار الخرج عن طريق إضافة الرمز التالي في نهاية التعليمة:", options:[";",":",".","/"], correct:0 },
  { num:6, section:"أوامر MATLAB الأساسية", text:"ليظهر الرقم بدقة أربعة أرقام مشرّية بعد الفاصلة نستخدم التعليمة:", options:["format short","short format","long format","format long"], correct:0 },
  { num:7, section:"المتحولات والمصفوفات", text:"المتحول السلمي (Scalar) هو متحول بأبعاد:", options:["m×1","m×n","1×1","جميع ما سبق خاطئ"], correct:2 },
  { num:8, section:"المتحولات والمصفوفات", text:"أي من المتحولات التالية لا يمكن تعريفه في ماتلاب:", options:["B","a2","2a","Amp"], correct:2 },
  { num:9, section:"المتحولات والمصفوفات", text:"للفصل بين أسطر المصفوفة نستخدم:", options:[";",":",".", "مسافة"], correct:0 },
  { num:10, section:"المتحولات والمصفوفات", text:"التعليمة ones(3,2) تعطي مصفوفة من ثلاثة أسطر وعمودين:", options:["كل عناصرها تساوي الواحد","كل عناصرها تساوي الصفر","عناصرها عشوائية","جميع ما سبق خاطئ"], correct:0 },
  { num:11, section:"المتحولات والمصفوفات", text:"التعليمة zeros(3,2) تعطي مصفوفة من ثلاثة أسطر وعمودين:", options:["كل عناصرها تساوي الواحد","كل عناصرها تساوي الصفر","عناصرها عشوائية","جميع ما سبق خاطئ"], correct:1 },
  { num:12, section:"المتحولات والمصفوفات", text:"لتوليد مصفوفة محايدة عناصرها الرئيسية فقط تساوي الواحد نستخدم:", options:["ones(2,2)","rand(2,2)","zeros(2,2)","eye(2,2)"], correct:3 },
  { num:13, section:"المتحولات والمصفوفات", text:"لجمع المصفوفتين a وb نستخدم:", options:["a+b","b+a","جميع ما سبق صحيح","جميع ما سبق خاطئ"], correct:2 },
  { num:14, section:"المتحولات والمصفوفات", text:"إن التعليمة a=3:7 تعطي:", options:["a=[3 4 5 6 7]","a=[3 5 7]","a=[1 3 5 7]","a=[3 4 5 6 7 8]"], correct:0 },
  { num:15, section:"المتحولات والمصفوفات", text:"إن التعليمة f=6:2:13 تعطي:", options:["f=[6 7 8 9 10 11 12 13 14]","f=[6 8 10 12 14]","f=[6 8 10 12]","f=[6 8 10 12 13]"], correct:2 },
  { num:16, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء العنصر في السطر الأول والعمود الثاني في مصفوفة A (2×2) بالفهرس الخطي:", options:["A(1,1)","A(2)","A(3)","جميع ما سبق خاطئ"], correct:2 },
  { num:17, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء العنصر في السطر الأول والعمود الثاني في مصفوفة A (4×5):", options:["A(1,3)","A(2,1)","A(1,2)","A(5,1)"], correct:2 },
  { num:18, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء السطر الثاني في المصفوفة A نستخدم التعليمة:", options:["A(2,1)","A(2,:)","A(:,2)","A(1,2)"], correct:1 },
  { num:19, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء العمود الثاني في المصفوفة A نستخدم التعليمة:", options:["A(2,1)","A(2,:)","A(:,2)","A(1,2)"], correct:2 },
  { num:20, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء العمود الرابع من المصفوفة C نستخدم:", options:["C(4,:)","C(:,4)","C(4,4)","C(4)"], correct:1 },
  { num:21, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء العناصر الثلاثة الأولى من السطر الثالث في مصفوفة A (4×5) نستخدم:", options:["A(1,3:3)","A(3,1:3)","A(1:3,1:2:3)","A(3,1:1:3)"], correct:1 },
  { num:22, section:"استدعاء عناصر المصفوفة", text:"لاستدعاء آخر سطر في المصفوفة A نستخدم التعليمة:", options:["A(:,end)","A(end,:)","A(end,end)","A(:,)"], correct:1 },
  { num:23, section:"استدعاء عناصر المصفوفة", text:"لإضافة عمود إلى المصفوفة A المؤلفة من 3 أسطر و4 أعمدة نستخدم:", options:["A(:,5)=[1 2 3]","A(:,4)=[1 2 3]","A(:,5)=[1 2 3 4]","A(5,:)=[1 2 3]"], correct:0 },
  { num:24, section:"استدعاء عناصر المصفوفة", text:"لحذف العمود الثاني من المصفوفة A نستخدم التعليمة:", options:["A(:,2)=[]","A(:,2)={}","A(:,2)=[0]","A(:,2)=1"], correct:0 },
  { num:25, section:"استدعاء عناصر المصفوفة", text:"لاستبدال العنصر في السطر الثاني والعمود الثالث بالقيمة 13:", options:["A(2,3)=13","A(3,2)=13","A(3:2)=13","A(2 3)=13"], correct:0 },
  { num:26, section:"العمليات على المصفوفات", text:"لجمع الرقم 5 إلى جميع عناصر المصفوفة B نستخدم:", options:["11+5","B+5","conv(B,5)","sum(B,5)"], correct:1 },
  { num:27, section:"العمليات على المصفوفات", text:"لضرب المصفوفتين a وb ضرب عنصر مقابل عنصر نستخدم:", options:["a.*b","conv(a,b)","a*b","deconv(a,b)"], correct:0 },
  { num:28, section:"العمليات على المصفوفات", text:"لطرح المصفوفة c من a نستخدم التعليمة:", options:["c-a","a-c","-a+c","A-c"], correct:1 },
  { num:29, section:"العمليات على المصفوفات", text:"لضرب عناصر المصفوفة a بالرقم 9 نستخدم:", options:["9*a","9.*a","conv(9,a)","9^a"], correct:0 },
  { num:30, section:"العمليات على المصفوفات", text:"لإيجاد محدد المصفوفة a نستخدم التعليمة:", options:["inv(a)","a'","conj(a)","det(a)"], correct:3 },
  { num:31, section:"العمليات على المصفوفات", text:"لإيجاد مقلوب المصفوفة a نستخدم التعليمة:", options:["det(a)","a'","conj(a)","inv(a)"], correct:3 },
  { num:32, section:"العمليات على المصفوفات", text:"التعليمة A/B تكافئ:", options:["inv(A)*B","inv(A)/B","A*inv(B)","A/inv(B)"], correct:2 },
  { num:33, section:"كثير الحدود", text:"لإدخال كثير الحدود p(x) = 3x⁴ + x³ + 2x² + 2x نستخدم:", options:["p=[3 2 1 1]","p=[3 2 1 1 0]","p=[3 1 2 2 0]","p=[3 1 2 2 0 0]"], correct:2 },
  { num:34, section:"كثير الحدود", text:"لإدخال كثير الحدود P = x⁴ - 3x + 2 نستخدم:", options:["P=[1 0 0 -3 2]","P=[1 -3 3 2]","P=[4 0 0 -3 2]","P=[1 0 -3 2]"], correct:0 },
  { num:35, section:"كثير الحدود", text:"لحساب مشتق كثير الحدود المُمثل بالشعاع f نستخدم التعليمة:", options:["polyint(f)","polyder(f)","polyval(f)","polyvalm(f)"], correct:1 },
  { num:36, section:"كثير الحدود", text:"لتكاملة كثير الحدود الممثل بالشعاع f من أجل ثابت تكامل يساوي 8 نستخدم:", options:["polyint(f,8)","polymt(f,8)","polyder(f,8)","polyder(f,li)"], correct:0 },
  { num:37, section:"كثير الحدود", text:"لإيجاد قيمة كثير الحدود الممثل بالشعاع h من أجل قيم الشعاع m نستخدم:", options:["poly(h,m)","polyval(h,m)","polyvalm(m,h)","polyvalm(h,m)"], correct:1 },
  { num:38, section:"كثير الحدود", text:"لإيجاد قيمة كثير الحدود الممثل بالشعاع m عند القيمة 3 نستخدم:", options:["poly(m,3)","polyval(m,3)","polyvalm(m,3)","polyvalm(3,m)"], correct:1 },
  { num:39, section:"كثير الحدود", text:"لإيجاد جذور كثير الحدود الممثل بالشعاع C نستخدم التعليمة:", options:["polyder(C)","poly(C)","roots(C)","polyint(C)"], correct:2 },
  { num:40, section:"كثير الحدود", text:"للحصول على أمثال كثير الحدود انطلاقاً من جذوره المعرفة بالشعاع f نستخدم:", options:["poly(f)","roots(f)","polyval(f)","polyder(f)"], correct:0 },
  { num:41, section:"كثير الحدود", text:"لإيجاد جداء كثيري الحدود المُمثلين بالشعاعين a وb نستخدم:", options:["deconv(a,b)","conv(a,b)","a.*b","a*b"], correct:1 },
  { num:42, section:"كثير الحدود", text:"لتقسيم كثير الحدود الممثل بالشعاع a على الشعاع b نستخدم:", options:["[q,r]=deconv(b,a)","[q,r]=deconv(a,b)","[q,s]=conv(b,a)","[q,s]=conv(a,b)"], correct:1 },
  { num:43, section:"كثير الحدود", text:"لإظهار عناصر المصفوفة A بدون طباعة اسمها نستخدم التعليمة:", options:["disp(A)","print(A)","dnp(A)","diap(A)"], correct:0 },
  { num:44, section:"الأعداد المركبة", text:"يعطي خرج التعليمة real(2+r) حيث r=2:", options:["ans=2","ans=2-2j","ans=1","جميع ما سبق خاطئ"], correct:0 },
  { num:45, section:"الأعداد المركبة", text:"يعطي خرج التعليمة imag(2+2j):", options:["ans=2","ans=2-2j","ans=1","جميع ما سبق خاطئ"], correct:0 },
  { num:46, section:"الأعداد المركبة", text:"يكون خرج التعليمة a=imag(1+2j):", options:["a=2","a=2j","a=i","a=1"], correct:0 },
  { num:47, section:"الأعداد المركبة", text:"يكون خرج التعليمة a=conj(1+2j):", options:["a=1+2j","a=1-2j","a=2j-1","a=1+2"], correct:1 },
  { num:48, section:"الأعداد المركبة", text:"لحساب القيمة المطلقة للعدد المركب 1+2j نستخدم:", options:["abs(1+2j)","imag(1+2j)","angle(1+2j)","conj(1+2j)"], correct:0 },
  { num:49, section:"الأعداد المركبة", text:"لتحويل السلسلة 'MOHAMMAD' إلى رموز ASCII نستخدم:", options:["double(a)","char(a)","ascii(a)","int(a)"], correct:0 },
  { num:50, section:"الأعداد المركبة", text:"لتحويل الشعاع a=[116 97 108 97 98] إلى سلسلة نصية نستخدم:", options:["double(a)","double(ans)","char(a)","char(a')"], correct:2 },
  { num:51, section:"الدوال الرياضية", text:"لحساب المضاعف المشترك الأصغر للعددين 25 و30 نستخدم:", options:["lcm(25,30)","gcd(25,30)","conj(25,30)","expm(25,30)"], correct:0 },
  { num:52, section:"الدوال الرياضية", text:"لإيجاد القاسم المشترك الأكبر للعددين 12 و6 نستخدم:", options:["lcm(12,6)","gcd(12,6)","expm(12,6)","exp(12,6)"], correct:1 },
  { num:53, section:"الدوال الرياضية", text:"عند تطبيق التعليمة a=floor(-0.5) ينتج:", options:["a=-1","a=0","a=-2","a=1"], correct:0 },
  { num:54, section:"الدوال الرياضية", text:"عند تطبيق التعليمة a=floor(-2.2) ينتج:", options:["a=-3","a=-2.5","a=-4","a=-2"], correct:0 },
  { num:55, section:"الدوال الرياضية", text:"عند تطبيق التعليمة a=fix(7.43) ينتج:", options:["a=8","a=6","a=7","جميع ما سبق خاطئ"], correct:2 },
  { num:56, section:"الدوال الرياضية", text:"لتقريب العدد 1.2 إلى أقرب عدد صحيح باتجاه الصفر نستخدم:", options:["floor(1.2)","round(1.2)","fix(1.2)","ceil(1.2)"], correct:2 },
  { num:57, section:"الدوال الرياضية", text:"عند تنفيذ التعليمة round(2.4) ينتج:", options:["ans=3","a=3","ans=2","a=2"], correct:2 },
  { num:58, section:"الدوال الرياضية", text:"عند تطبيق التعليمة a=rem(4,3) ينتج:", options:["a=0","a=1","a=2","a=3"], correct:1 },
  { num:59, section:"الدوال الرياضية", text:"عند تطبيق التعليمة factorial(4) ينتج:", options:["a=24","a=4","ans=24","ans=12"], correct:2 },
  { num:60, section:"الدوال الرياضية", text:"لحساب 3! نستخدم التعليمة:", options:["factorial(3)","imag(13)","factor(3)","primes(3)"], correct:0 },
  { num:61, section:"الدوال الرياضية", text:"لتحليل العدد 13 إلى عوامله الأولية نستخدم:", options:["factorial(13)","primes(13)","factor(13)","abs(13)"], correct:2 },
  { num:62, section:"الدوال الرياضية", text:"للحصول على جميع الأعداد الأولية الأصغر من 14 نستخدم:", options:["com(14)","conv(14)","primes(14)","جميع ما سبق خاطئ"], correct:2 },
  { num:63, section:"الدوال الرياضية", text:"التعليمة linspace(20,100,50) تعطي:", options:["شعاعاً من 100 عنصر","شعاعاً من 20 عنصر","شعاعاً من 50 عنصر","جميع ما سبق خاطئ"], correct:2 },
  { num:64, section:"الدوال الرياضية", text:"عند تطبيق التعليمة max(c) على المصفوفة c=[13 47 18 25] ينتج:", options:["ans=47","ans=[25 47]","c=47","جميع ما سبق خاطئ"], correct:0 },
  { num:65, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ التعليمة 7>=-1 ينتج:", options:["ans=0","ans=1","ans=8","ans=7"], correct:1 },
  { num:66, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ التعليمة 0|2 ينتج:", options:["ans=0","ans=1","a=2","a=0"], correct:1 },
  { num:67, section:"العمليات المنطقية والمقارنة", text:"ناتج تنفيذ التعليمة a=2|0:", options:["a=0","a=1","ans=0","ans=2"], correct:1 },
  { num:68, section:"العمليات المنطقية والمقارنة", text:"ناتج تنفيذ التعليمة a=2&0:", options:["a=0","a=1","ans=2","جميع ما سبق خاطئ"], correct:0 },
  { num:69, section:"العمليات المنطقية والمقارنة", text:"ناتج تنفيذ التعليمة a=xor(2,5):", options:["a=0","a=-1","ans=2","a=5"], correct:0 },
  { num:70, section:"العمليات المنطقية والمقارنة", text:"عند تطبيق f=sign(a) على a=[0 -10 30 0 -10] ينتج:", options:["f=[-1 -1 1 -1 0]","f=[0 -1 1 0 -1]","f=[0 -1 1 -1 0]","f=[0 1 1 1 0]"], correct:1 },
  { num:71, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ f=all(a) حيث a=[1 2 6 7 5] ينتج:", options:["f=0","f=1","ans=0","ans=1"], correct:1 },
  { num:72, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ b=any(b) حيث b=[1 2 3 4 5 0] ينتج:", options:["b=0","ans=0","ans=1","b=1"], correct:2 },
  { num:73, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ find(a>3) حيث a=[5 4 0 3 2 1] ينتج:", options:["ans=1 2","ans=1 2 4","ans=1 2 3","جميع ما سبق خاطئ"], correct:0 },
  { num:74, section:"العمليات المنطقية والمقارنة", text:"عند تنفيذ isletter(a='WPU 2020') ينتج:", options:["ans=1 1 1 0 0 0 0 0","ans=0 0 0 1 1 1 1 1","a=1 1 1 0 0","ans=0 0 0 0 0 0 0 0"], correct:0 },
  { num:75, section:"الرسم البياني", text:"لرسم نقاط الشعاع f بدلالة دليل عناصره نستخدم:", options:["plot(f)","plot(1,f)","plot(1.f)","shg(f)"], correct:0 },
  { num:76, section:"الرسم البياني", text:"لرسم نقاط الشعاع f بدلالة عناصر الشعاع c نستخدم:", options:["plot(f)","plot(c)","plot(c,f)","shg(c,f)"], correct:2 },
  { num:77, section:"الرسم البياني", text:"لرسم منحنيين بيانيين للشعاعين a1 وa2 بدلالة الشعاع x على نفس النافذة:", options:["plot(x,a1,x,a2)","plot(a1,x,a2)","plot(x,a1,x2)","Plot3(x,a1,x,a2)"], correct:0 },
  { num:78, section:"الرسم البياني", text:"لرسم منحنيين على نفس النافذة باستخدام محورين منفصلين لـ y نستخدم:", options:["plotyy(x,a1,x,a2)","plot(x1,x2)","plot(x,a1,x,a2)","plot(x,a1,x2)"], correct:0 },
  { num:79, section:"الرسم البياني", text:"التعليمة المستخدمة لوضع خطوط الشبكة على نافذة الرسم:", options:["shg","grid","figure(1)","جميع ما سبق خاطئ"], correct:1 },
  { num:80, section:"الرسم البياني", text:"للاحتفاظ بالمخطط الحالي وإضافة منحنيات جديدة إليه نستخدم:", options:["hold on","figure(n)","hold off","جميع ما سبق خاطئ"], correct:0 },
  { num:81, section:"الرسم البياني", text:"لفتح نافذة رسم ذات الرقم 5 وجعلها النافذة النشطة نستخدم:", options:["Figure","shg(5)","figure(5)","plot(5)"], correct:2 },
  { num:82, section:"الرسم البياني", text:"لتسمية المحور x في مخطط الرسم باسم 'time' نستخدم:", options:["xlabel('time')","title('time')","ylabel('time')","xanele('time')"], correct:0 },
  { num:83, section:"الرسم البياني", text:"لرسم مخطط أعمدة ثلاثي الأبعاد بحيث تتراكم عناصر كل صف فوق بعضها نستخدم:", options:["bar3(x,'group')","bar(x,'group')","bar(x,'stack')","bar3(x,'stack')"], correct:3 },
  { num:84, section:"الرسم البياني", text:"المصفوفة a مؤلفة من 4 أسطر و3 أعمدة. يرسم bar(a) مخططاً مكوّناً من:", options:["أربع مجموعات من الأعمدة","ثلاث مجموعات من الأعمدة","مجموعتان من الأعمدة","جميع ما سبق خاطئ"], correct:1 },
  { num:85, section:"الرسم البياني", text:"لإظهار العلاقة بين الشعاعين x وy بواسطة مخطط الأعمدة نستخدم:", options:["bar(x,y)","bar3(x,y)","جميع ما سبق صحيح","جميع ما سبق خاطئ"], correct:0 },
  { num:86, section:"الرسم البياني", text:"لرسم القسمة المئوية لمساحة كل عنصر من A في مخطط الشرائح نستخدم:", options:["pie(A)","circle(A)","جميع ما سبق صحيح","جميع ما سبق خاطئ"], correct:0 },
  { num:87, section:"الرسم البياني", text:"لتقسيم نافذة الرسم إلى 6 أقسام (2 سطر × 3 أعمدة) وتفعيل أعلى اليمين:", options:["subplot(3,2,2)","subplot(2,3,3)","subplot(2,3,5)","جميع ما سبق خاطئ"], correct:1 },
  { num:88, section:"البرمجة — Script و Function", text:"تُخصص اللاحقة (.m) في برمجة MATLAB لملفات:", options:["Script فقط","Function فقط","Script و Function معاً","جميع ما سبق خاطئ"], correct:2 },
  { num:89, section:"البرمجة — Script و Function", text:"تتميز ملفات النوادع (Functions) بـ:", options:["السماح بوجود دخل وخرج","عدم السماح بوجود خرج","عدم السماح بوجود دخل","B وC معاً"], correct:0 },
  { num:90, section:"البرمجة — Script و Function", text:"تتميز ملفات Script بـ:", options:["السماح بوجود دخل وخرج","عدم السماح بوجود خرج فقط","عدم السماح بوجود دخل فقط","عدم السماح بوجود دخل وخرج معاً"], correct:3 },
  { num:91, section:"البرمجة — Script و Function", text:"لإنشاء ملف Script جديد باسم 'average' نستخدم:", options:["script average","add average","edit average","new average"], correct:0 },
  { num:92, section:"البرمجة — Script و Function", text:"للتصريح عن تابع باسم test له دخلان x وy وخرج وحيد n نستخدم:", options:["function n=test(x,y)","function [x,y]=test(n)","n=test(x,y)","[x,y]=test(n)"], correct:0 },
  { num:93, section:"البرمجة — Script و Function", text:"يتم حفظ التابع 'max' في ملف باسم:", options:["max.mat","max.fig","max1.m","max.m"], correct:3 },
];

const COMMAND_QUESTIONS = [
  { num:94, section:"الأوامر الحسابية", text:"ما وظيفة الأمر abs؟", options:["حساب زاوية الطور للعدد العقدي","حساب القيمة المطلقة لعدد حقيقي أو الطويلة (المعامل) لعدد عقدي","استخراج الجزء الحقيقي من العدد العقدي","إيجاد العدد المرافق للعدد العقدي"], correct:1 },
  { num:95, section:"الأوامر الحسابية", text:"ما وظيفة الأمر angle؟", options:["حساب زاوية الطور (الزاوية) للعدد العقدي","حساب القيمة المطلقة (الطويلة) للعدد العقدي","استخراج الجزء التخيلي من العدد العقدي","استخراج الجزء الحقيقي من العدد العقدي"], correct:0 },
  { num:96, section:"الأوامر الحسابية", text:"ما وظيفة الأمر ceil؟", options:["التقريب لأقرب عدد صحيح باتجاه اللانهاية السالبة (للأسفل)","التقريب لأقرب عدد صحيح باتجاه الصفر","التقريب لأقرب عدد صحيح بالإبعاد عن الصفر","التقريب لأقرب عدد صحيح باتجاه اللانهاية الموجبة (للأعلى)"], correct:3 },
  { num:97, section:"الأوامر الحسابية", text:"ما وظيفة الأمر conj؟", options:["إيجاد العدد المرافق (conjugate) للعدد العقدي","حساب زاوية الطور للعدد العقدي","حساب القيمة المطلقة للعدد العقدي","استخراج الجزء الحقيقي من العدد العقدي"], correct:0 },
  { num:98, section:"الأوامر الحسابية", text:"ما وظيفة الأمر exp؟", options:["حساب الجذر التربيعي للعدد","حساب عاملي العدد","التقريب إلى أقرب عدد صحيح","حساب التابع الأسي e^x"], correct:3 },
  { num:99, section:"الأوامر الحسابية", text:"ما وظيفة الأمر factorial؟", options:["حساب التابع الأسي e^x","حساب الجذر التربيعي للعدد","حساب عاملي العدد (!)","إيجاد القاسم المشترك الأكبر"], correct:2 },
  { num:100, section:"الأوامر الحسابية", text:"ما وظيفة الأمر fix؟", options:["التقريب لأقرب عدد صحيح باتجاه اللانهاية الموجبة","التقريب لأقرب عدد صحيح باتجاه اللانهاية السالبة","التقريب لأقرب عدد صحيح بالإبعاد عن الصفر","التقريب لأقرب عدد صحيح باتجاه الصفر (حذف الجزء الكسري)"], correct:3 },
  { num:101, section:"الأوامر الحسابية", text:"ما وظيفة الأمر floor؟", options:["التقريب لأقرب عدد صحيح باتجاه الصفر","التقريب لأقرب عدد صحيح باتجاه اللانهاية الموجبة","التقريب لأقرب عدد صحيح باتجاه اللانهاية السالبة (للأسفل)","التقريب لأقرب عدد صحيح بالإبعاد عن الصفر"], correct:2 },
  { num:102, section:"الأوامر الحسابية", text:"ما وظيفة الأمر gcd؟", options:["إيجاد المضاعف المشترك الأصغر بين عددين","حساب باقي القسمة بين عددين","إيجاد القاسم المشترك الأكبر بين عددين","حساب عاملي العدد"], correct:2 },
  { num:103, section:"الأوامر الحسابية", text:"ما وظيفة الأمر imag؟", options:["استخراج الجزء الحقيقي من العدد العقدي","استخراج الجزء التخيلي من العدد العقدي","حساب القيمة المطلقة للعدد العقدي","إيجاد العدد المرافق للعدد العقدي"], correct:1 },
  { num:104, section:"الأوامر الحسابية", text:"ما وظيفة الأمر lcm؟", options:["إيجاد القاسم المشترك الأكبر بين عددين","حساب باقي القسمة بين عددين","حساب عاملي العدد","إيجاد المضاعف المشترك الأصغر بين عددين"], correct:3 },
  { num:105, section:"الأوامر الحسابية", text:"ما وظيفة الأمر primes؟", options:["إيجاد القاسم المشترك الأكبر بين عددين","حساب عاملي العدد","الحصول على جميع الأعداد الأولية الأصغر من أو تساوي رقم محدد","إيجاد المضاعف المشترك الأصغر بين عددين"], correct:2 },
  { num:106, section:"الأوامر الحسابية", text:"ما وظيفة الأمر real؟", options:["استخراج الجزء التخيلي من العدد العقدي","استخراج الجزء الحقيقي من العدد العقدي","حساب زاوية الطور للعدد العقدي","إيجاد العدد المرافق للعدد العقدي"], correct:1 },
  { num:107, section:"الأوامر الحسابية", text:"ما وظيفة الأمر rem؟", options:["إيجاد القاسم المشترك الأكبر بين عددين","إيجاد المضاعف المشترك الأصغر بين عددين","التقريب لأقرب عدد صحيح باتجاه الصفر","حساب باقي القسمة بين عددين"], correct:3 },
  { num:108, section:"الأوامر الحسابية", text:"ما وظيفة الأمر round؟", options:["التقريب لأقرب عدد صحيح باتجاه اللانهاية الموجبة","التقريب لأقرب عدد صحيح باتجاه الصفر","التقريب إلى أقرب عدد صحيح (الإبعاد عن الصفر عند .5)","التقريب لأقرب عدد صحيح باتجاه اللانهاية السالبة"], correct:2 },
  { num:109, section:"الأوامر الحسابية", text:"ما وظيفة الأمر sign؟", options:["إعطاء القيمة المطلقة للعدد بلا إشارة","التقريب إلى أقرب عدد صحيح","إعطاء 1 للموجب، -1 للسالب، 0 للصفر (التابع الإشاري)","حساب باقي القسمة بين عددين"], correct:2 },
  { num:110, section:"الأوامر الحسابية", text:"ما وظيفة الأمر sqrt؟", options:["حساب التابع الأسي e^x","حساب عاملي العدد","إيجاد القاسم المشترك الأكبر","حساب الجذر التربيعي للعدد"], correct:3 },
  { num:111, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر all؟", options:["إعطاء 1 إذا كان عنصر واحد على الأقل لا يساوي الصفر","إعطاء 1 فقط إذا كانت جميع عناصر المصفوفة لا تساوي الصفر","عكس القيمة المنطقية لكل عنصر","عد عدد العناصر غير الصفرية في المصفوفة"], correct:1 },
  { num:112, section:"أوامر البيئة والمنطق", text:"ما وظيفة العامل & (and)؟", options:["المعامل المنطقي (أو): صحيح إذا كان أحد الطرفين صحيحاً","المعامل المنطقي (و): صحيح فقط إذا كان الطرفان صحيحين","عكس القيمة المنطقية لطرف واحد","إعطاء 1 إذا كانت جميع عناصر المصفوفة صحيحة"], correct:1 },
  { num:113, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر any؟", options:["إعطاء 1 فقط إذا كانت جميع العناصر لا تساوي الصفر","إعطاء 1 إذا كان عنصر واحد على الأقل لا يساوي الصفر","عكس القيمة المنطقية لكل عنصر","المعامل المنطقي (أو) بين مصفوفتين"], correct:1 },
  { num:114, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر char؟", options:["تحويل الحرف إلى رمزه الرقمي ASCII","تحويل رمز ASCII رقمي إلى حرف","تحويل الرقم إلى نوع بيانات بدقة مضاعفة","استخراج الجزء الحقيقي من رقم"], correct:1 },
  { num:115, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر clc؟", options:["حذف جميع المتحولات من الذاكرة","مسح شاشة نافذة الأوامر فقط دون حذف المتحولات","مسح الرسم البياني الحالي","إغلاق جميع نوافذ الرسم"], correct:1 },
  { num:116, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر clear؟", options:["طباعة قيمة المتحول على الشاشة","مسح الشاشة فقط دون التأثير على المتحولات","حذف متحول أو جميع المتحولات من مساحة العمل","إعادة تعيين المتحول إلى صفر"], correct:2 },
  { num:117, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر disp؟", options:["إظهار اسم المتحول فقط دون قيمته","حذف المتحول من الذاكرة بعد عرضه","إظهار قيمة المتحول دون طباعة اسمه","مسح شاشة نافذة الأوامر"], correct:2 },
  { num:118, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر double؟", options:["تحويل رمز ASCII رقمي إلى حرف","تحويل القيمة إلى رقم بدقة مضاعفة","استخراج الجزء الحقيقي من رقم عقدي","إعطاء القيمة المطلقة للرقم"], correct:1 },
  { num:119, section:"أوامر البيئة والمنطق", text:"ما وظيفة العامل ~ (not)؟", options:["المعامل المنطقي (و) بين طرفين","المعامل المنطقي (أو) بين طرفين","النفي المنطقي: يعكس حالة الصحة والخطأ","إعطاء 1 إذا كانت جميع العناصر صحيحة"], correct:2 },
  { num:120, section:"أوامر البيئة والمنطق", text:"ما وظيفة العامل | (or)؟", options:["المعامل المنطقي (و): صحيح فقط إذا كان الطرفان صحيحين","المعامل المنطقي (أو): صحيح إذا كان أحد الطرفين على الأقل صحيحاً","النفي المنطقي لقيمة واحدة","إعطاء 1 إذا كان عنصر واحد في المصفوفة غير صفري"], correct:1 },
  { num:121, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر who؟", options:["إظهار أسماء وتفاصيل المتحولات (الحجم والنوع)","إظهار أسماء المتحولات المخزنة فقط دون تفاصيل","حذف جميع المتحولات من الذاكرة","إظهار قيم جميع المتحولات الحالية"], correct:1 },
  { num:122, section:"أوامر البيئة والمنطق", text:"ما وظيفة الأمر whos؟", options:["إظهار أسماء المتحولات فقط دون أي تفاصيل","إظهار قائمة بالمتحولات مع تفاصيلها (الحجم والنوع)","حذف جميع المتحولات من الذاكرة","إنشاء متحول جديد فارغ"], correct:1 },
  { num:123, section:"أوامر المصفوفات", text:"ما وظيفة الأمر det؟", options:["إيجاد مقلوب (معكوس) المصفوفة","حساب محدد المصفوفة (determinant)","إيجاد منقول المصفوفة (transpose)","حساب القيم الذاتية للمصفوفة"], correct:1 },
  { num:124, section:"أوامر المصفوفات", text:"ما وظيفة الأمر eye؟", options:["توليد مصفوفة جميع عناصرها تساوي الواحد","توليد مصفوفة حيادية قطرها الرئيسي 1 وباقي العناصر صفر","توليد مصفوفة عشوائية القيم","توليد شعاع من عناصر تساوي الواحد"], correct:1 },
  { num:125, section:"أوامر المصفوفات", text:"ما وظيفة الأمر inv؟", options:["إيجاد منقول المصفوفة (transpose)","حساب محدد المصفوفة","حساب أثر المصفوفة (trace)","إيجاد مقلوب (معكوس) المصفوفة"], correct:3 },
  { num:126, section:"أوامر المصفوفات", text:"ما وظيفة الأمر length؟", options:["حساب مجموع عناصر الشعاع","إيجاد عدد عناصر الشعاع أو أكبر بُعد في المصفوفة","إنشاء شعاع بعدد محدد من النقاط المتباعدة خطياً","إيجاد أكبر قيمة داخل الشعاع"], correct:1 },
  { num:127, section:"أوامر المصفوفات", text:"ما وظيفة الأمر linspace؟", options:["إيجاد عدد عناصر الشعاع","إنشاء شعاع ذو عناصر متباعدة خطياً بين قيمتين بعدد محدد من النقاط","توليد شعاع جميع عناصره تساوي الواحد","توليد شعاع عشوائي القيم"], correct:1 },
  { num:128, section:"أوامر المصفوفات", text:"ما وظيفة الأمر max؟", options:["إيجاد أصغر قيمة في المصفوفة أو الشعاع","إيجاد أكبر قيمة في المصفوفة أو الشعاع","حساب مجموع جميع العناصر","ترتيب عناصر المصفوفة تصاعدياً"], correct:1 },
  { num:129, section:"أوامر المصفوفات", text:"ما وظيفة الأمر min؟", options:["إيجاد أكبر قيمة في المصفوفة أو الشعاع","إيجاد أصغر قيمة في المصفوفة أو الشعاع","حساب مجموع جميع العناصر","إيجاد عدد عناصر الشعاع"], correct:1 },
  { num:130, section:"أوامر المصفوفات", text:"ما وظيفة الأمر ones؟", options:["توليد مصفوفة جميع عناصرها تساوي الصفر","توليد مصفوفة جميع عناصرها تساوي الواحد","توليد مصفوفة قطرها الرئيسي يساوي 1","توليد مصفوفة عشوائية القيم"], correct:1 },
  { num:131, section:"أوامر المصفوفات", text:"ما وظيفة الأمر rand؟", options:["توليد مصفوفة جميع عناصرها صفر","توليد مصفوفة عناصرها أرقام عشوائية بين 0 و1","توليد مصفوفة جميع عناصرها واحد","توليد مصفوفة حيادية (قطرها 1)"], correct:1 },
  { num:132, section:"أوامر المصفوفات", text:"ما وظيفة الأمر sum؟", options:["إيجاد أكبر قيمة في الشعاع","حساب مجموع عناصر شعاع أو كل عمود في مصفوفة","إيجاد عدد عناصر الشعاع","ترتيب عناصر الشعاع تصاعدياً"], correct:1 },
  { num:133, section:"أوامر المصفوفات", text:"ما وظيفة الأمر zeros؟", options:["توليد مصفوفة جميع عناصرها تساوي الواحد","توليد مصفوفة جميع عناصرها تساوي الصفر","توليد مصفوفة حيادية قطرها الرئيسي 1","توليد مصفوفة عشوائية القيم"], correct:1 },
  { num:134, section:"أوامر المصفوفات", text:"ما وظيفة عامل : (النقطتان)؟", options:["إيجاد عدد عناصر المصفوفة","معامل لاستدعاء أو إنشاء سلسلة كاملة من الأسطر أو الأعمدة","حساب محدد المصفوفة","إيجاد مقلوب المصفوفة"], correct:1 },
  { num:135, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر conv؟", options:["قسمة كثيري حدود وإعطاء ناتج وباقي","جداء كثيري حدود (عملية الالتفاف)","تكوين كثير حدود من جذوره","إيجاد قيمة كثير الحدود عند نقطة معينة"], correct:1 },
  { num:136, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر deconv؟", options:["جداء كثيري حدود","تكوين كثير حدود من جذوره","قسمة كثيري حدود، تُرجع ناتج القسمة والباقي معاً","حساب مشتقة كثير الحدود"], correct:2 },
  { num:137, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر poly؟", options:["إيجاد جذور كثير الحدود","حساب مشتقة كثير الحدود","حساب مكاملة كثير الحدود","تكوين كثير حدود انطلاقاً من جذوره المعطاة"], correct:3 },
  { num:138, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر polyder؟", options:["حساب مكاملة كثير الحدود","حساب مشتقة كثير الحدود","إيجاد قيمة كثير الحدود عند نقطة","إيجاد جذور كثير الحدود"], correct:1 },
  { num:139, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر polyint؟", options:["حساب مشتقة كثير الحدود","حساب مكاملة (تكامل) كثير الحدود","إيجاد جذور كثير الحدود","إيجاد قيمة كثير الحدود عند نقطة"], correct:1 },
  { num:140, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر polyval؟", options:["حساب مشتقة كثير الحدود عند نقطة","حساب مكاملة كثير الحدود","إيجاد جذور كثير الحدود","إيجاد قيمة كثير الحدود عند نقطة محددة"], correct:3 },
  { num:141, section:"أوامر كثيرات الحدود", text:"ما وظيفة الأمر roots؟", options:["حساب مشتقة كثير الحدود","حساب مكاملة كثير الحدود","إيجاد جذور كثير الحدود","تكوين كثير حدود من جذوره"], correct:2 },
  { num:142, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر bar؟", options:["رسم مخطط دائري (شرائح)","رسم مخطط أعمدة","رسم خطوط بيانية ثنائية الأبعاد","رسم مخطط ثلاثي الأبعاد"], correct:1 },
  { num:143, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر figure؟", options:["إضافة عنوان للرسم","فتح نافذة رسم جديدة","تقسيم نافذة الرسم لعدة أقسام","مسح الرسم الحالي"], correct:1 },
  { num:144, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر grid؟", options:["إخفاء محاور الرسم","تكبير حجم الرسم البياني","إظهار أو إخفاء خطوط الشبكة على المخطط","تغيير لون خلفية المخطط"], correct:2 },
  { num:145, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر hold؟", options:["حفظ الملف الحالي على القرص","تجميد تنفيذ البرنامج بالكامل","إيقاف تحديث الرسم نهائياً","الاحتفاظ بالرسم الحالي للسماح بإضافة منحنيات جديدة فوقه"], correct:3 },
  { num:146, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر pie؟", options:["رسم مخطط دائري (شرائح)","رسم مخطط أعمدة","رسم خط بياني","رسم سطح ثلاثي الأبعاد"], correct:0 },
  { num:147, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر plot؟", options:["رسم مخططات ثلاثية الأبعاد","رسم الخطوط البيانية ثنائية الأبعاد","رسم مخطط أعمدة","رسم مخطط دائري"], correct:1 },
  { num:148, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر plot3؟", options:["رسم الخطوط البيانية ثنائية الأبعاد فقط","رسم المخططات ثلاثية الأبعاد (x,y,z)","رسم مخطط دائري ثلاثي الألوان","رسم مخطط أعمدة بثلاث مجموعات"], correct:1 },
  { num:149, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر shg؟", options:["حفظ الرسم البياني على القرص","مسح الرسم البياني الحالي","تكبير حجم نافذة الرسم","إظهار الرسم البياني الحالي ووضعه في مقدمة الشاشة"], correct:3 },
  { num:150, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر subplot؟", options:["إضافة عنوان للمخطط","تقسيم نافذة الرسم إلى عدة أقسام لرسم مخططات متعددة","تسمية محاور المخطط","حفظ المخطط في ملف"], correct:1 },
  { num:151, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر title؟", options:["تسمية المحور الأفقي X","إضافة عنوان رئيسي للمخطط البياني","تسمية المحور العمودي Y","حفظ الرسم باسم معين"], correct:1 },
  { num:152, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر xlabel؟", options:["تسمية المحور العمودي Y","إضافة عنوان للمخطط","تسمية المحور الأفقي X في المخطط","تسمية المحور العميق Z"], correct:2 },
  { num:153, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر ylabel؟", options:["تسمية المحور الأفقي X","إضافة عنوان للمخطط","تسمية المحور العميق Z","تسمية المحور العمودي Y في المخطط"], correct:3 },
  { num:154, section:"أوامر الرسوم البيانية", text:"ما وظيفة الأمر zlabel؟", options:["تسمية المحور الأفقي X","تسمية المحور العمودي Y","تسمية المحور العميق Z في المخططات ثلاثية الأبعاد","إضافة عنوان للمخطط"], correct:2 },
];

const SECTION_META = {
  "أوامر MATLAB الأساسية":       { color:"#38bdf8", bg:"#0c2a3a", icon:"⌨️" },
  "المتحولات والمصفوفات":         { color:"#38bdf8", bg:"#0c2a3a", icon:"📦" },
  "استدعاء عناصر المصفوفة":       { color:"#34d399", bg:"#062a1c", icon:"🔍" },
  "العمليات على المصفوفات":       { color:"#34d399", bg:"#062a1c", icon:"✖️" },
  "كثير الحدود":                  { color:"#a78bfa", bg:"#1a0a38", icon:"📈" },
  "الأعداد المركبة":              { color:"#a78bfa", bg:"#1a0a38", icon:"∫"  },
  "الدوال الرياضية":              { color:"#fb923c", bg:"#2a1200", icon:"🔢" },
  "العمليات المنطقية والمقارنة":  { color:"#f472b6", bg:"#2a0015", icon:"⚡" },
  "الرسم البياني":                { color:"#fbbf24", bg:"#2a1f00", icon:"📊" },
  "البرمجة — Script و Function":  { color:"#ef4444", bg:"#2a0000", icon:"💻" },
  "الأوامر الحسابية":             { color:"#34d399", bg:"#062a1c", icon:"🧮" },
  "أوامر البيئة والمنطق":         { color:"#b18aff", bg:"#1a0a38", icon:"⚙️" },
  "أوامر المصفوفات":              { color:"#4aa3ff", bg:"#0a1a38", icon:"📊" },
  "أوامر كثيرات الحدود":          { color:"#f5a623", bg:"#2a1f00", icon:"📈" },
  "أوامر الرسوم البيانية":        { color:"#ef5350", bg:"#2a0000", icon:"📉" },
};
const LETTERS = ["أ","ب","ج","د"];
const shuffle = a => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; };

function Ring({pct,size=130,stroke=10,color="#38bdf8"}) {
  const r=(size-stroke)/2, c=2*Math.PI*r;
  return <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
      strokeDasharray={c} strokeDashoffset={c*(1-pct/100)} style={{transition:"stroke-dashoffset .6s ease"}}/>
  </svg>;
}

export default function App() {
  const [phase, setPhase]         = useState("start");
  const [qs, setQs]               = useState([]);
  const [qsSource, setQsSource]   = useState(ALL_QUESTIONS);
  const [idx, setIdx]             = useState(0);
  const [sel, setSel]             = useState(null);
  const [answers, setAnswers]     = useState([]);
  const [filterSec, setFilterSec] = useState(null);

  const score    = answers.filter((a,i)=>a===qs[i]?.correct).length;
  const q        = qs[idx];
  const meta     = q ? (SECTION_META[q.section]||{color:"#38bdf8",bg:"#0c2a3a",icon:"📚"}) : {};

  function start(source, shuffled=false){
    setQsSource(source);
    setQs(shuffled?shuffle(source):[...source]);
    setIdx(0); setSel(null); setAnswers([]); setPhase("quiz");
  }
  function startSection(source, section){
    setQsSource(source);
    setQs(shuffle(source.filter(q=>q.section===section)));
    setIdx(0); setSel(null); setAnswers([]); setPhase("quiz");
  }
  function retryWrong(){
    const wrong = qs.filter((_, i) => answers[i] !== qs[i]?.correct);
    setQs(shuffle(wrong));
    setIdx(0); setSel(null); setAnswers([]); setPhase("quiz");
  }
  function pick(i){ if(sel!==null)return; setSel(i); }
  function next(){
    const na=[...answers,sel];
    setAnswers(na);
    if(idx+1>=qs.length){ setPhase("results"); }
    else { setIdx(idx+1); setSel(null); }
  }

  const sStats = useMemo(()=>{
    if(!qs.length||!answers.length) return {};
    const s={};
    qs.forEach((q,i)=>{
      if(answers[i]===undefined) return;
      if(!s[q.section]) s[q.section]={t:0,c:0};
      s[q.section].t++;
      if(answers[i]===q.correct) s[q.section].c++;
    });
    return s;
  },[qs,answers]);

  const base = { fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif", direction:"rtl",
    textAlign:"right", minHeight:"100vh", background:"#0f172a", color:"#e2e8f0",
    display:"flex", flexDirection:"column", alignItems:"center" };

  /* ── START ── */
  if(phase==="start") return (
    <div style={base}>
      <div style={{width:"100%",maxWidth:620,padding:"36px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
        <div style={{fontSize:52}}>🖥️</div>
        <h1 style={{fontSize:26,fontWeight:800,color:"#f8fafc",textAlign:"center",margin:0,lineHeight:1.3}}>
          اختبار مهارات حاسوب 2
        </h1>
        <p style={{color:"#64748b",textAlign:"center",margin:0,fontSize:13}}>
          الجامعة الوطنية الخاصة — قياس — الفصل الثاني 2019/2020
        </p>

        {[["📘 اختبار حاسوب 2",ALL_QUESTIONS],["⚡ اختبار الأكواد",COMMAND_QUESTIONS]].map(([label,src])=>(
          <div key={label} style={{width:"100%"}}>
            <div style={{color:"#64748b",fontSize:11,fontWeight:700,marginBottom:6}}>{label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {[...new Set(src.map(q=>q.section))].map(s=>{
                const m=SECTION_META[s]||{color:"#38bdf8",bg:"#0c2a3a",icon:"📚"};
                const cnt=src.filter(q=>q.section===s).length;
                return <button key={s} onClick={()=>startSection(src,s)} style={{background:m.bg,border:`1px solid ${m.color}30`,borderRadius:10,padding:"9px 11px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",textAlign:"right",width:"100%",transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=m.color} onMouseLeave={e=>e.currentTarget.style.borderColor=m.color+"30"}>
                  <span style={{fontSize:16}}>{m.icon}</span>
                  <div>
                    <div style={{color:m.color,fontSize:10.5,fontWeight:700,lineHeight:1.3}}>{s}</div>
                    <div style={{color:"#475569",fontSize:10}}>{cnt} سؤال</div>
                  </div>
                </button>;
              })}
            </div>
          </div>
        ))}

        <div style={{display:"flex",gap:10,width:"100%"}}>
          <button onClick={()=>start(ALL_QUESTIONS,false)} style={{flex:1,padding:"13px",borderRadius:10,border:"none",
            background:"#38bdf8",color:"#0f172a",fontSize:15,fontWeight:800,cursor:"pointer"}}>
            ابدأ بالترتيب
          </button>
          <button onClick={()=>start(ALL_QUESTIONS,true)} style={{flex:1,padding:"13px",borderRadius:10,
            border:"1.5px solid #38bdf8",background:"transparent",color:"#38bdf8",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            🔀 عشوائي
          </button>
        </div>

        <div style={{width:"100%",background:"#1e293b",borderRadius:12,padding:"9px 14px",display:"flex",alignItems:"center",gap:10}}>
          <span style={{color:"#fb923c",fontSize:16}}>⚡</span>
          <button onClick={()=>start(COMMAND_QUESTIONS,true)} style={{flex:1,background:"transparent",border:"none",
            color:"#fb923c",fontSize:14,fontWeight:800,cursor:"pointer",textAlign:"right",padding:"4px 0"}}>
            اختبار الأكواد (شامل) ←
          </button>
        </div>
      </div>
    </div>
  );

  /* ── QUIZ ── */
  if(phase==="quiz"&&q){
    const pct=Math.round((idx/qs.length)*100);
    return (
      <div style={base}>
        <div style={{width:"100%",maxWidth:620,padding:"18px 16px",display:"flex",flexDirection:"column",gap:12}}>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{background:meta.bg,border:`1px solid ${meta.color}40`,borderRadius:20,
              padding:"4px 11px",fontSize:11.5,color:meta.color,fontWeight:700}}>
              {meta.icon} {q.section}
            </div>
            <div style={{color:"#475569",fontSize:13}}>
              <span style={{color:"#f1f5f9",fontWeight:800}}>{idx+1}</span> / {qs.length}
            </div>
          </div>

          <div style={{background:"#1e293b",borderRadius:99,height:5,overflow:"hidden"}}>
            <div style={{height:"100%",background:meta.color,width:`${pct}%`,
              transition:"width .4s ease",borderRadius:99}}/>
          </div>

          <div style={{background:"#1e293b",borderRadius:14,padding:"18px 16px",border:"1px solid #2d3748"}}>
            <div style={{color:"#475569",fontSize:11,marginBottom:6,fontWeight:600}}>السؤال {q.num}</div>
            <div style={{fontSize:16,fontWeight:700,lineHeight:1.75,color:"#f1f5f9"}}>{q.text}</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {q.options.map((opt,i)=>{
              let bg="#1e293b",bdr="#2d3748",clr="#cbd5e1",fw="500";
              if(sel!==null){
                if(i===q.correct){bg="#052e16";bdr="#22c55e";clr="#4ade80";fw="700";}
                else if(i===sel){bg="#2d0a0a";bdr="#ef4444";clr="#f87171";}
              }
              return <button key={i} onClick={()=>pick(i)}
                style={{background:bg,border:`1.5px solid ${bdr}`,borderRadius:10,padding:"12px 14px",
                  cursor:sel===null?"pointer":"default",display:"flex",alignItems:"center",gap:10,
                  textAlign:"right",direction:"rtl",width:"100%",transition:"all .2s"}}>
                <span style={{minWidth:26,height:26,borderRadius:7,
                  background:sel!==null&&i===q.correct?"#22c55e20":sel!==null&&i===sel&&i!==q.correct?"#ef444420":"#0f172a",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:800,color:bdr,border:`1px solid ${bdr}`,flexShrink:0}}>
                  {LETTERS[i]}
                </span>
                <span style={{color:clr,fontWeight:fw,fontSize:14,flex:1,lineHeight:1.4}}>{opt}</span>
                {sel!==null&&i===q.correct&&<span style={{color:"#4ade80",fontSize:17,flexShrink:0}}>✓</span>}
                {sel!==null&&i===sel&&i!==q.correct&&<span style={{color:"#f87171",fontSize:17,flexShrink:0}}>✗</span>}
              </button>;
            })}
          </div>

          {sel!==null&&<>
            <div style={{background:sel===q.correct?"#052e16":"#2d0a0a",borderRadius:10,padding:"11px 14px",
              border:`1px solid ${sel===q.correct?"#22c55e":"#ef4444"}`,
              color:sel===q.correct?"#4ade80":"#f87171",textAlign:"center",fontSize:13,fontWeight:700}}>
              {sel===q.correct?"✅ إجابة صحيحة!":"❌ إجابة خاطئة — الصواب: "+LETTERS[q.correct]+") "+q.options[q.correct]}
            </div>
            <button onClick={next} style={{background:meta.color,border:"none",borderRadius:10,
              padding:"13px",fontSize:15,fontWeight:800,color:"#0f172a",cursor:"pointer"}}>
              {idx+1===qs.length?"🏁 انهاء الاختبار":"التالي ←"}
            </button>
          </>}
        </div>
      </div>
    );
  }

  /* ── RESULTS ── */
  if(phase==="results"){
    const pct=Math.round((score/qs.length)*100);
    const wrongAnswers = qs.filter((_, i) => answers[i] !== qs[i]?.correct).length;
    const [grade,gc]=pct>=90?["ممتاز 🏆","#fbbf24"]:pct>=75?["جيد جداً ⭐","#34d399"]:
                     pct>=60?["جيد 👍","#38bdf8"]:pct>=50?["مقبول 📚","#a78bfa"]:["يحتاج مراجعة 📖","#ef4444"];
    return (
      <div style={base}>
        <div style={{width:"100%",maxWidth:620,padding:"28px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <div style={{fontSize:44}}>🎓</div>
          <h2 style={{color:"#f8fafc",fontSize:22,margin:0,fontWeight:800}}>نتيجة الاختبار</h2>

          <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ring pct={pct} size={130} stroke={11} color={gc}/>
            <div style={{position:"absolute",textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:gc}}>{pct}%</div>
              <div style={{fontSize:11,color:"#475569"}}>{score}/{qs.length}</div>
            </div>
          </div>

          <div style={{background:"#1e293b",borderRadius:10,padding:"10px 22px",fontSize:16,fontWeight:800,color:gc}}>{grade}</div>

          <div style={{width:"100%",background:"#1e293b",borderRadius:14,padding:"14px",display:"flex",flexDirection:"column",gap:9}}>
            <div style={{color:"#64748b",fontSize:12,fontWeight:700,marginBottom:2}}>الأداء حسب الموضوع</div>
            {Object.entries(sStats).map(([sec,st])=>{
              const m=SECTION_META[sec]||{color:"#38bdf8",icon:"📚"};
              const p=Math.round((st.c/st.t)*100);
              return <div key={sec}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5,marginBottom:3}}>
                  <span style={{color:"#cbd5e1"}}>{m.icon} {sec}</span>
                  <span style={{color:m.color,fontWeight:700}}>{st.c}/{st.t} ({p}%)</span>
                </div>
                <div style={{background:"#0f172a",borderRadius:99,height:4,overflow:"hidden"}}>
                  <div style={{height:"100%",background:m.color,width:`${p}%`,borderRadius:99}}/>
                </div>
              </div>;
            })}
          </div>

          {wrongAnswers > 0 && (
            <button onClick={retryWrong} style={{width:"100%",padding:"12px",borderRadius:10,
              border:"1.5px solid #f97316",background:"#2a1200",color:"#fb923c",
              fontSize:13,fontWeight:700,cursor:"pointer"}}>
              🔄 اختبار الأخطاء فقط ({wrongAnswers} سؤال)
            </button>
          )}
          <div style={{display:"flex",gap:10,width:"100%"}}>
            <button onClick={()=>{setFilterSec(null);setPhase("review");}} style={{flex:1,padding:"12px",
              borderRadius:10,border:"1.5px solid #38bdf8",background:"transparent",
              color:"#38bdf8",fontSize:14,fontWeight:700,cursor:"pointer"}}>
              📋 مراجعة الأسئلة
            </button>
            <button onClick={()=>start(qsSource,false)} style={{flex:1,padding:"12px",borderRadius:10,
              border:"none",background:"#38bdf8",color:"#0f172a",fontSize:14,fontWeight:800,cursor:"pointer"}}>
              🔄 إعادة الاختبار
            </button>
          </div>
          <button onClick={()=>setPhase("start")} style={{background:"transparent",border:"none",
            color:"#475569",fontSize:13,cursor:"pointer",textDecoration:"underline"}}>
            الصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  /* ── REVIEW ── */
  if(phase==="review"){
    const wrong=qs.filter((_,i)=>answers[i]!==qs[i]?.correct).length;
    const display=filterSec?qs.filter(q=>q.section===filterSec):qs;
    return (
      <div style={base}>
        <div style={{width:"100%",maxWidth:620,padding:"14px 14px 32px",display:"flex",flexDirection:"column",gap:11}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <button onClick={()=>setPhase("results")} style={{background:"transparent",
              border:"1px solid #2d3748",borderRadius:8,padding:"5px 11px",
              color:"#94a3b8",cursor:"pointer",fontSize:12}}>← نتائج</button>
            <span style={{color:"#f1f5f9",fontWeight:700,fontSize:15}}>مراجعة الأسئلة</span>
            <span style={{background:"#2d0a0a",color:"#f87171",fontSize:11,fontWeight:700,
              padding:"3px 9px",borderRadius:20}}>{wrong} خطأ</span>
          </div>

          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            <button onClick={()=>setFilterSec(null)}
              style={{padding:"4px 10px",borderRadius:20,fontSize:10.5,fontWeight:700,cursor:"pointer",
                border:`1px solid ${!filterSec?"#38bdf8":"#2d3748"}`,
                background:!filterSec?"#0c2a3a":"transparent",color:!filterSec?"#38bdf8":"#475569"}}>
              الكل ({qs.length})
            </button>
            {[...new Set(qs.map(q=>q.section))].map(s=>{
              const m=SECTION_META[s]||{color:"#38bdf8"};
              const on=filterSec===s;
              return <button key={s} onClick={()=>setFilterSec(on?null:s)}
                style={{padding:"4px 9px",borderRadius:20,fontSize:10,fontWeight:700,cursor:"pointer",
                  border:`1px solid ${on?m.color:m.color+"30"}`,
                  background:on?m.bg:"transparent",color:on?m.color:m.color+"70"}}>
                {m.icon} {s.split("—")[0].trim()}
              </button>;
            })}
          </div>

          {display.map(q=>{
            const oi=qs.indexOf(q), ans=answers[oi], ok=ans===q.correct;
            const m=SECTION_META[q.section]||{color:"#38bdf8",bg:"#0c2a3a"};
            return <div key={q.num} style={{background:"#1e293b",borderRadius:12,padding:"13px 14px",
              border:`1.5px solid ${ok?"#22c55e25":"#ef444425"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,flexWrap:"wrap",gap:4}}>
                <span style={{fontSize:10,color:m.color,fontWeight:700,background:m.bg,
                  padding:"2px 8px",borderRadius:20}}>{m.icon} {q.section}</span>
                <span style={{fontSize:11,fontWeight:800,color:ok?"#4ade80":"#f87171"}}>
                  {ok?"✅ صحيح":"❌ خطأ"}
                </span>
              </div>
              <div style={{fontSize:13.5,fontWeight:700,color:"#f1f5f9",marginBottom:9,lineHeight:1.65}}>{q.text}</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {q.options.map((opt,oi2)=>{
                  let bg2="transparent",bdr2="#2d3748",clr2="#64748b";
                  if(oi2===q.correct){bg2="#052e16";bdr2="#22c55e";clr2="#4ade80";}
                  if(oi2===ans&&oi2!==q.correct){bg2="#2d0a0a";bdr2="#ef4444";clr2="#f87171";}
                  return <div key={oi2} style={{background:bg2,border:`1px solid ${bdr2}`,
                    borderRadius:8,padding:"7px 10px",display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontWeight:800,color:bdr2,fontSize:11,minWidth:18,flexShrink:0}}>
                      {LETTERS[oi2]})
                    </span>
                    <span style={{color:clr2,fontSize:12.5,flex:1,lineHeight:1.4}}>{opt}</span>
                    {oi2===q.correct&&<span style={{color:"#4ade80",fontSize:11,fontWeight:700,
                      flexShrink:0,marginRight:"auto"}}>✓ صواب</span>}
                    {oi2===ans&&oi2!==q.correct&&<span style={{color:"#f87171",fontSize:11,fontWeight:700,
                      flexShrink:0,marginRight:"auto"}}>✗ اخترت</span>}
                  </div>;
                })}
              </div>
            </div>;
          })}
        </div>
      </div>
    );
  }

  return null;
}
