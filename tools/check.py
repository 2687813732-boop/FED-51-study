import json,re
s=open(r"F:\deepseek-harness\fde51-app\www\data.js",encoding="utf-8").read()
d=json.loads(s[s.index("{"):s.rindex(";")])
for x in (d["days"][0],d["days"][4],d["days"][11],d["days"][50]):
    print(x["day"],x["date"],x["weekday"],x["topic"],"|",x["deliverable"])
print([ (w["week"],w["from"],w["to"],w["theme"]) for w in d["weeks"]])
print(d["faq"][0])
print(d["slices"][0])
