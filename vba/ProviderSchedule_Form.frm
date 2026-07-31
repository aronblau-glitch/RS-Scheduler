Attribute VB_Name = "provsched"
Attribute VB_Base = "0{69643705-4AAF-4A09-87D0-9D0F025C0073}{D3708EC3-4324-46EB-AF85-FBCF6B49BB44}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = False

Private Sub CommandButton1_Click()

If Me.providerlist.Value = "" Then
    MsgBox "Please select Provider first", vbCritical
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

For i = 4 To ncol
    If LCase(Trim(timews.Cells(1, i))) = LCase(Trim(Me.providerlist.Value)) Then
        colval = i
        Exit For
    End If
Next i
outptws.Cells(1, 1) = Me.providerlist.Value
outptws.Cells(2, 3) = "Student"
For i = 2 To nrows
    If timews.Cells(i, colval) <> "" And timews.Cells(i, 1) <> "" And timews.Cells(i, colval) <> "NA" Then
        outptws.Cells(nout, 1) = timews.Cells(i, 1)
        outptws.Cells(nout, 2) = timews.Cells(i, 2)
        outptws.Cells(nout, 3) = timews.Cells(i, colval)
        nout = nout + 1
    End If
Next i


Unload Me
Application.DisplayAlerts = True
outptws.Select

End Sub

Private Sub quit_Click()
Unload Me
End Sub

Private Sub UserForm_Click()

End Sub
