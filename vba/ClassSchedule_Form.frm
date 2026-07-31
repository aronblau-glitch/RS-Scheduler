Attribute VB_Name = "Class_sched"
Attribute VB_Base = "0{6561D936-1B10-436F-975E-0D8FB27E35B7}{B7FD7511-0E3D-4647-9D14-A8FB78A60740}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = False

Private Sub CommandButton1_Click()

If Me.sessionlist.Value = "" Then
    MsgBox "Please select  session first", vbCritical
    Exit Sub
End If

Application.DisplayAlerts = False
On Error Resume Next
ThisWorkbook.Sheets("Result").Delete
On Error GoTo 0

Set tempws = ThisWorkbook.Sheets("TEMP1")

tempws.Visible = True
tempws.Copy after:=ThisWorkbook.Sheets("MENU")
Set outptws = ActiveSheet
outptws.Name = "Result"
tempws.Visible = False

Set timews = ThisWorkbook.Sheets("Timeslot")
nrows = timews.Cells(timews.Rows.Count, 1).End(xlUp).Row

ncol = timews.Cells(1, timews.Columns.Count).End(xlToLeft).Column
nout = 3

outptws.Cells(1, 1) = Me.sessionlist.Value
outptws.Cells(2, 3) = "Student"
For i = 2 To nrows

    For j = 4 To ncol
        If timews.Cells(i, j) <> "" And LCase(Trim(timews.Cells(i, 3))) = LCase(Trim(Me.sessionlist.Value)) And (LCase(Trim(timews.Cells(i, 1))) = LCase(Trim(Me.daylist.Value)) Or Me.daylist.Value = "") Then
            outptws.Cells(nout, 1) = timews.Cells(i, 1)
            outptws.Cells(nout, 2) = timews.Cells(i, 2)
            outptws.Cells(nout, 3) = timews.Cells(i, j)
            nout = nout + 1
        End If
    Next j
Next i


Unload Me
Application.DisplayAlerts = True
outptws.Select

End Sub

Private Sub quit_Click()
Unload Me
End Sub

