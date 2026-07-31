Attribute VB_Name = "Module2"
Sub gen_student_sched()
nrows = ThisWorkbook.Sheets("Student Mandates List").Cells(ThisWorkbook.Sheets("Student Mandates List").Rows.Count, 1).End(xlUp).Row
Set Listrange = ThisWorkbook.Sheets("Student Mandates List").Range("A2:A" & nrows)
studentsched.studentlist.List = WorksheetFunction.Transpose(Listrange)
studentsched.Show
End Sub

Sub gen_prov_sched()
ncol = ThisWorkbook.Sheets("Providers Config").Cells(1, ThisWorkbook.Sheets("Providers Config").Columns.Count).End(xlToLeft).Column
Set Listrange = ThisWorkbook.Sheets("Providers Config").Range(ThisWorkbook.Sheets("Providers Config").Cells(1, 4), ThisWorkbook.Sheets("Providers Config").Cells(1, ncol))
provsched.providerlist.List = WorksheetFunction.Transpose(Listrange)
provsched.Show
End Sub


Sub gen_class_sched()
Set configws = ThisWorkbook.Sheets("School Config")
nrow1 = configws.Cells(configws.Rows.Count, 8).End(xlUp).Row
nrow2 = configws.Cells(configws.Rows.Count, 9).End(xlUp).Row
Set rng1 = configws.Range(configws.Cells(2, 8), configws.Cells(nrow1, 8))
Set rng2 = configws.Range(configws.Cells(2, 9), configws.Cells(nrow2, 9))
Class_sched.daylist.List = WorksheetFunction.Transpose(rng2)
Class_sched.sessionlist.List = WorksheetFunction.Transpose(rng1)
Class_sched.Show
End Sub



