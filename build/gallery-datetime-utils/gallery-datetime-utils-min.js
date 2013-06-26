YUI.add("gallery-datetime-utils",function(e,t){"use strict";function n(e){var t=e.toString();return t.length<2&&(t="0"+t),t}function r(e){return/^\d+$/.test(e)}e.DateTimeUtils={YEAR_POSITION:1,MONTH_POSITION:2,DAY_POSITION:3,DATE_FIELD_DELIMITER:"-",TIME_FIELD_DELIMITER:":",AM_STRING:"AM",PM_STRING:"PM",CLOCK_DISPLAY_TYPE:24,normalize:function(t,n){if(t instanceof Date){var r={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),hour:t.getHours(),minute:t.getMinutes(),date:t};return r}if(e.Lang.isNumber(t))return i.normalize(new Date(t));var r=e.clone(t);return r.date_str&&(e.Lang.isUndefined(r.year)&&e.Lang.isUndefined(r.month)&&e.Lang.isUndefined(r.day)&&e.mix(r,i.parseDate(r.date_str)),delete r.date_str),r.time_str?(e.Lang.isUndefined(r.hour)&&e.Lang.isUndefined(r.minute)&&e.mix(r,i.parseTime(r.time_str)),delete r.time_str):e.Lang.isUndefined(r.hour)&&(r.hour=n.hour,r.minute=n.minute),i.normalize(new Date(r.year,r.month-1,r.day,r.hour,r.minute))},formatDate:function(t){if(!t)return"";if(e.Lang.isString(t))return t;e.Lang.isNumber(t)&&(t=new Date(t));var r=[];return t instanceof Date?(r[i.YEAR_POSITION-1]=t.getFullYear().toString(),r[i.MONTH_POSITION-1]=n(t.getMonth()+1),r[i.DAY_POSITION-1]=n(t.getDate())):(r[i.YEAR_POSITION-1]=t.year.toString(),r[i.MONTH_POSITION-1]=n(t.month),r[i.DAY_POSITION-1]=n(t.day)),r.join(i.DATE_FIELD_DELIMITER)},parseDate:function(t){if(!t)return null;if(!e.Lang.isString(t))return t;try{var n=i.parseDateString(t,i.DATE_FIELD_DELIMITER,i.YEAR_POSITION,i.MONTH_POSITION,i.DAY_POSITION)}catch(r){n=i.parseDateString(t,"-",1,2,3)}var s={year:n.year,month:n.month,day:n.day};return s},parseDateString:function(t,n,s,o,u){var a=t.split(n);if(a.length!=3||!e.every(a,r))throw Error("Unparseable date format.");return i.normalize({year:parseInt(a[s-1],10),month:parseInt(a[o-1],10),day:parseInt(a[u-1],10),hour:0,minute:0})},formatTime:function(t){if(!t)return"";if(e.Lang.isString(t))return t;e.Lang.isNumber(t)&&(t=new Date(t)),t instanceof Date&&(t={hour:t.getHours(),minute:t.getMinutes()});if(i.CLOCK_DISPLAY_TYPE==12){var r=i.TIME_FIELD_DELIMITER+n(t.minute)+" ";return t.hour===0?"12"+r+i.AM_STRING:t.hour===12?"12"+r+i.PM_STRING:t.hour>12?t.hour-12+r+i.PM_STRING:t.hour+r+i.AM_STRING}return t.hour+i.TIME_FIELD_DELIMITER+n(t.minute)},parseTime:function(t){if(!t)return null;if(!e.Lang.isString(t))return t;var s=0,o=!1,u=!1;t.indexOf(i.AM_STRING)>0?(o=!0,t=e.Lang.trim(t.replace(i.AM_STRING,""))):t.indexOf(i.PM_STRING)>0&&(u=!0,t=e.Lang.trim(t.replace(i.PM_STRING,"")),s=12);var a=t.split(i.TIME_FIELD_DELIMITER);if(a.length==1&&(o||u))a[1]=0;else if(a.length<2||3<a.length||!e.every(a,r))throw Error("Unparseable time format.");o&&a[0]=="12"?a[0]=0:u&&a[0]=="12"&&(s=0);var f={hour:parseInt(a[0],10)+s,minute:parseInt(a[1],10)};if(f.hour<0||23<f.hour||f.minute<0||59<f.minute)throw Error("Invalid time values: "+f.hour+i.TIME_FIELD_DELIMITER+n(f.minute));return f}};var i=e.DateTimeUtils},"gallery-2013.06.26-23-09",{requires:["gallery-funcprog"]});
