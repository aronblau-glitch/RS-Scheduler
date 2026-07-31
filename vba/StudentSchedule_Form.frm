Attribute VB_Name = "studentsched"
Attribute VB_Base = "0{0A242F3B-A03A-4B22-8EF5-99EC53241D2C}{7044CD59-818B-4C57-85DE-78932D9B2865}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = False

Private Sub CommandButton1_Click()

If Me.studentlist.Value = "" Then
    MsgBox "Please select student first", vbCritical
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

outptws.Cells(1, 1) = Me.studentlist.Value
outptws.Cells(2, 3) = "Session"

For i = 2 To nrows

    For j = 4 To ncol
        If InStr(LCase(Trim(timews.Cells(i, j))), LCase(Trim(Me.studentlist.Value))) > 0 Then
            outptws.Cells(nout, 1) = timews.Cells(i, 1)
            outptws.Cells(nout, 2) = timews.Cells(i, 2)
            outptws.Cells(nout, 3) = timews.Cells(1, j)
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
