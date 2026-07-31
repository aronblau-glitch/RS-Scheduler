Attribute VB_Name = "SwapPanel"
Attribute VB_Base = "0{A904B848-C82E-4800-BFD7-9AA29D4F1A22}{85FF137F-F810-4AA9-A175-8AF7C9559DA4}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = False
Private WithEvents lstSwaps As MSForms.ListBox
Attribute lstSwaps.VB_VarHelpID = -1
Private WithEvents btnSwap As MSForms.CommandButton
Attribute btnSwap.VB_VarHelpID = -1
Private WithEvents btnClose As MSForms.CommandButton
Attribute btnClose.VB_VarHelpID = -1
Private lblStudent As MSForms.Label

Public selectedStudent As String
Public selectedRow As Long
Public selectedCol As Long
Public ws As Worksheet

Private Sub UserForm_Initialize()
    ' Build form
    Me.Caption = "Available Swaps"
    Me.Width = 350
    Me.Height = 450
    Me.StartUpPosition = 0
    Me.Left = Application.Left + Application.Width - 370
    Me.Top = Application.Top + 80

    ' Build Label
    Set lblStudent = Me.Controls.Add("Forms.Label.1", "lblStudent", True)
    With lblStudent
        .Caption = "Click a student on the sheet"
        .Left = 6
        .Top = 6
        .Width = 330
        .Height = 30
        .Font.Bold = True
        .Font.Size = 10
        .WordWrap = True
    End With

    ' Build ListBox
    Set lstSwaps = Me.Controls.Add("Forms.ListBox.1", "lstSwaps", True)
    With lstSwaps
        .Left = 6
        .Top = 42
        .Width = 330
        .Height = 310
        .ColumnCount = 3
        .ColumnWidths = "130;80;110"
    End With

    ' Build Swap button
    Set btnSwap = Me.Controls.Add("Forms.CommandButton.1", "btnSwap", True)
    With btnSwap
        .Caption = "Swap Selected"
        .Left = 6
        .Top = 362
        .Width = 155
        .Height = 35
        .Font.Bold = True
        .BackColor = RGB(0, 180, 0)
        .ForeColor = RGB(255, 255, 255)
    End With

    ' Build Close button
    Set btnClose = Me.Controls.Add("Forms.CommandButton.1", "btnClose", True)
    With btnClose
        .Caption = "Close"
        .Left = 170
        .Top = 362
        .Width = 155
        .Height = 35
        .Font.Bold = True
    End With

End Sub

Public Sub LoadSwaps(studentname As String, sRow As Long, sCol As Long)
    selectedStudent = studentname
    selectedRow = sRow
    selectedCol = sCol
    Set ws = ThisWorkbook.Sheets("Timeslot")

    lstSwaps.Clear

    If Right(studentname, 1) = "-" Then
        studentname = Left(studentname, Len(studentname) - 1)
    End If

    Dim nrowtime As Long
    nrowtime = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim ncol As Long
    ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

    Dim sourceDay As String
    Dim sourceTime As Variant
    Dim sourceProvider As String
    sourceDay = LCase(ws.Cells(sRow, 1).Value)
    sourceTime = ws.Cells(sRow, 2).Value
    sourceProvider = LCase(ws.Cells(1, sCol).Value)

    Dim i As Long, r As Long, c As Long

    For i = 2 To nrowtime
        If i = sRow Then GoTo NextRow

        Dim targetDay As String
        Dim targetTime As Variant
        targetDay = LCase(ws.Cells(i, 1).Value)
        targetTime = ws.Cells(i, 2).Value

        If targetDay = "" Or targetTime = "" Then GoTo NextRow

        Dim targetStudent As String
        targetStudent = Trim(ws.Cells(i, sCol).Value)
        If targetStudent = "" Or LCase(targetStudent) = "x" Then GoTo NextRow

        Dim targetStudentClean As String
        targetStudentClean = targetStudent
        If Right(targetStudentClean, 1) = "-" Then
            targetStudentClean = Left(targetStudentClean, Len(targetStudentClean) - 1)
        End If

        Dim v1 As Boolean, v2 As Boolean
        v1 = True
        v2 = True

        For r = 2 To nrowtime
            Dim rDay As String
            Dim rTime As Variant
            rDay = LCase(ws.Cells(r, 1).Value)
            rTime = ws.Cells(r, 2).Value
            For c = 4 To ncol
                If (r = sRow And c = sCol) Then GoTo Skip1
                If (r = i And c = sCol) Then GoTo Skip1
                Dim cc As String
                Dim rp As String
                cc = LCase(Trim(ws.Cells(r, c).Value))
                rp = LCase(ws.Cells(1, c).Value)
                If InStr(cc, LCase(studentname)) > 0 Then
                    If rDay = targetDay And rTime = targetTime Then v1 = False
                    If rTime = targetTime And rDay <> targetDay Then v1 = False
                    If rDay = targetDay And rp = sourceProvider Then v1 = False
                End If
                If InStr(cc, LCase(targetStudentClean)) > 0 Then
                    If rDay = sourceDay And rTime = sourceTime Then v2 = False
                    If rTime = sourceTime And rDay <> sourceDay Then v2 = False
                    If rDay = sourceDay And rp = sourceProvider Then v2 = False
                End If
Skip1:
            Next c
            If v1 = False And v2 = False Then Exit For
        Next r

        If v1 = True And v2 = True Then
            lstSwaps.AddItem targetStudent
            lstSwaps.List(lstSwaps.ListCount - 1, 1) = ws.Cells(i, 1).Value
            lstSwaps.List(lstSwaps.ListCount - 1, 2) = Format(targetTime, "h:mm AM/PM")
        End If

NextRow:
    Next i

    If lstSwaps.ListCount = 0 Then
        lblStudent.Caption = "No valid swaps for " & studentname
    Else
        lblStudent.Caption = studentname & " — " & lstSwaps.ListCount & " swap(s) available" & vbNewLine & "Current: " & ws.Cells(sRow, 1).Value & " at " & Format(sourceTime, "h:mm AM/PM")
    End If

End Sub

Private Sub lstSwaps_Click()
    ' highlight selection
End Sub

Private Sub btnSwap_Click()
    If lstSwaps.ListIndex = -1 Then
        MsgBox "Please select a student from the list first.", vbExclamation
        Exit Sub
    End If

    Dim targetStudent As String
    Dim targetDay As String
    Dim targetTime As String
    targetStudent = lstSwaps.List(lstSwaps.ListIndex, 0)
    targetDay = lstSwaps.List(lstSwaps.ListIndex, 1)
    targetTime = lstSwaps.List(lstSwaps.ListIndex, 2)

    ' Find target row
    Dim targetRow As Long
    targetRow = 0
    Dim i As Long
    For i = 2 To ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        If LCase(Trim(ws.Cells(i, selectedCol).Value)) = LCase(Trim(targetStudent)) Then
            targetRow = i
            Exit For
        End If
    Next i

    If targetRow = 0 Then
        MsgBox "Could not find student row. Please try again.", vbExclamation
        Exit Sub
    End If

    ' Perform swap
    Application.EnableEvents = False
    Dim tempVal As String
    tempVal = ws.Cells(selectedRow, selectedCol).Value
    ws.Cells(selectedRow, selectedCol).Value = ws.Cells(targetRow, selectedCol).Value
    ws.Cells(targetRow, selectedCol).Value = tempVal
    Application.EnableEvents = True

    MsgBox "Swap completed!" & vbNewLine & vbNewLine & selectedStudent & " moved to: " & targetDay & " at " & targetTime & vbNewLine & targetStudent & " moved to: " & ws.Cells(targetRow, 1).Value & " at " & Format(ws.Cells(targetRow, 2).Value, "h:mm AM/PM"), vbInformation, "Swap Done"

    ' Reload with new position
    Call LoadSwaps(selectedStudent, targetRow, selectedCol)

End Sub

Private Sub btnClose_Click()
    Unload Me
End Sub

