Attribute VB_Name = "Sheet5"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Dim beforeValue As String
Dim beforeAddress As String
Dim isSelecting As Boolean

Private Const HIGHLIGHT_COLOR As Long = 5287936

Private Sub Worksheet_Activate()
    Application.EnableEvents = True
    isSelecting = False
End Sub

Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    On Error GoTo cleanup
    If isSelecting Then Exit Sub
    If Target.Count > 1 Then Exit Sub

    isSelecting = True
    Call ClearHighlights
    isSelecting = False

    If Target.Column < 4 Or Target.Row < 2 Then
        beforeValue = ""
        beforeAddress = ""
        Exit Sub
    End If

    Dim cellVal As String
    cellVal = Trim(Target.Value)

    If cellVal = "" Or LCase(cellVal) = "x" Then
        beforeValue = ""
        beforeAddress = ""
        Exit Sub
    End If

    If InStr(cellVal, ",") = 0 And InStr(cellVal, " ") = 0 Then
        beforeValue = ""
        beforeAddress = ""
        Exit Sub
    End If

    beforeValue = cellVal
    beforeAddress = Target.Address

    isSelecting = True
    Call HighlightSwappable(cellVal, Target)
    isSelecting = False

    ' Launch swap panel
    Dim panel As SwapPanel
    Set panel = New SwapPanel
    panel.Show vbModeless
    Call panel.LoadSwaps(cellVal, Target.Row, Target.Column)

    Exit Sub

cleanup:
    isSelecting = False
End Sub

Sub HighlightSwappable(studentname As String, sourceCell As Range)
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Timeslot")

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
    sourceDay = LCase(ws.Cells(sourceCell.Row, 1).Value)
    sourceTime = ws.Cells(sourceCell.Row, 2).Value
    sourceProvider = LCase(ws.Cells(1, sourceCell.Column).Value)

    Dim i As Long, r As Long, c As Long

    For i = 2 To nrowtime
        If i = sourceCell.Row Then GoTo NextRow

        Dim targetDay As String
        Dim targetTime As Variant
        targetDay = LCase(ws.Cells(i, 1).Value)
        targetTime = ws.Cells(i, 2).Value

        If targetDay = "" Or targetTime = "" Then GoTo NextRow

        Dim targetStudent As String
        targetStudent = Trim(ws.Cells(i, sourceCell.Column).Value)
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
                If (r = sourceCell.Row And c = sourceCell.Column) Then GoTo Skip1
                If (r = i And c = sourceCell.Column) Then GoTo Skip1
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
            ws.Cells(i, sourceCell.Column).Interior.Color = HIGHLIGHT_COLOR
        End If

NextRow:
    Next i

    Application.StatusBar = "Green = valid swap for " & studentname

End Sub

Sub ClearHighlights()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Timeslot")
    Dim nrowtime As Long
    nrowtime = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim ncol As Long
    ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    Dim i As Long, j As Long
    For i = 2 To nrowtime
        For j = 4 To ncol
            If ws.Cells(i, j).Interior.Color = HIGHLIGHT_COLOR Then
                ws.Cells(i, j).Interior.ColorIndex = xlNone
            End If
        Next j
    Next i
    Application.StatusBar = False
End Sub

Private Sub Worksheet_Change(ByVal Target As Range)
    On Error GoTo cleanup
    If isSelecting Then Exit Sub
    If Target.Column < 4 Or Target.Row < 2 Then Exit Sub
    If Target.Count > 1 Then Exit Sub

    Dim newValue As String
    newValue = Trim(Target.Value)

    If newValue = "" Then
        Call ClearHighlights
        Exit Sub
    End If
    If newValue = beforeValue And Target.Address = beforeAddress Then Exit Sub
    If beforeValue = "" Or beforeAddress = "" Then Exit Sub

    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Timeslot")

    Dim studentname As String
    studentname = newValue
    If Right(studentname, 1) = "-" Then
        studentname = Left(studentname, Len(studentname) - 1)
    End If

    Dim nrowtime As Long
    nrowtime = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim ncol As Long
    ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

    Dim destDay As String
    Dim destTime As Variant
    Dim destProvider As String
    destDay = LCase(ws.Cells(Target.Row, 1).Value)
    destTime = ws.Cells(Target.Row, 2).Value
    destProvider = LCase(ws.Cells(1, Target.Column).Value)

    Dim i As Long, j As Long
    Dim overlapDay As Boolean
    Dim overlapWeek As Boolean
    Dim overlapProvider As Boolean
    overlapDay = False
    overlapWeek = False
    overlapProvider = False

    For i = 2 To nrowtime
        Dim thisDay As String
        Dim thisTime As Variant
        Dim thisProvider As String
        thisDay = LCase(ws.Cells(i, 1).Value)
        thisTime = ws.Cells(i, 2).Value
        For j = 4 To ncol
            If i = Target.Row And j = Target.Column Then
            ElseIf InStr(LCase(ws.Cells(i, j).Value), LCase(studentname)) > 0 Then
                If thisDay = destDay And thisTime = destTime Then overlapDay = True
                If thisTime = destTime And thisDay <> destDay Then overlapWeek = True
                thisProvider = LCase(ws.Cells(1, j).Value)
                If thisDay = destDay And thisProvider = destProvider Then overlapProvider = True
            End If
        Next j
    Next i

    Dim cancelMove As Boolean
    cancelMove = False

    If overlapDay = True Then
        Dim answerDay As Integer
        Dim conflictDayProvider As String
        Dim cri As Long, crj As Long
        For cri = 2 To nrowtime
            For crj = 4 To ncol
                If InStr(LCase(ws.Cells(cri, crj).Value), LCase(studentname)) > 0 Then
                    If LCase(ws.Cells(cri, 1).Value) = destDay And ws.Cells(cri, 2).Value = destTime Then
                        conflictDayProvider = ws.Cells(1, crj).Value
                    End If
                End If
            Next crj
        Next cri
        answerDay = MsgBox(studentname & " already has a session on:" & vbNewLine & "  - Day: " & destDay & "  |  Time: " & Format(destTime, "h:mm AM/PM") & "  |  Provider: " & conflictDayProvider & vbNewLine & vbNewLine & "You are trying to move to:" & vbNewLine & "  - Day: " & destDay & "  |  Time: " & Format(destTime, "h:mm AM/PM") & "  |  Provider: " & ws.Cells(1, Target.Column).Value & vbNewLine & vbNewLine & "Do you want to override?", vbYesNo + vbExclamation, "Same Day Conflict")
        If answerDay = vbNo Then cancelMove = True
    End If

    If cancelMove = False And overlapWeek = True Then
        Dim answerWeek As Integer
        Dim allConflicts As String
        Dim ri As Long, rj As Long
        allConflicts = ""
        For ri = 2 To nrowtime
            For rj = 4 To ncol
                If InStr(LCase(ws.Cells(ri, rj).Value), LCase(studentname)) > 0 Then
                    If ws.Cells(ri, 2).Value = destTime And LCase(ws.Cells(ri, 1).Value) <> destDay Then
                        allConflicts = allConflicts & "  - Day: " & ws.Cells(ri, 1).Value & "  |  Time: " & Format(ws.Cells(ri, 2).Value, "h:mm AM/PM") & "  |  Provider: " & ws.Cells(1, rj).Value & vbNewLine
                    End If
                End If
            Next rj
        Next ri
        answerWeek = MsgBox(studentname & " already has a session at the same timeslot on:" & vbNewLine & vbNewLine & allConflicts & vbNewLine & "You are trying to move to:" & vbNewLine & "  - Day: " & destDay & "  |  Time: " & Format(destTime, "h:mm AM/PM") & "  |  Provider: " & ws.Cells(1, Target.Column).Value & vbNewLine & vbNewLine & "Do you want to override?", vbYesNo + vbExclamation, "Same Week Conflict")
        If answerWeek = vbNo Then cancelMove = True
    End If

    If cancelMove = False And overlapProvider = True Then
        Dim answerProvider As Integer
        Dim allProvConflicts As String
        Dim pri As Long, prj As Long
        allProvConflicts = ""
        For pri = 2 To nrowtime
            For prj = 4 To ncol
                If InStr(LCase(ws.Cells(pri, prj).Value), LCase(studentname)) > 0 Then
                    If LCase(ws.Cells(1, prj).Value) = destProvider And LCase(ws.Cells(pri, 1).Value) = destDay Then
                        allProvConflicts = allProvConflicts & "  - Day: " & ws.Cells(pri, 1).Value & "  |  Time: " & Format(ws.Cells(pri, 2).Value, "h:mm AM/PM") & "  |  Provider: " & ws.Cells(1, prj).Value & vbNewLine
                    End If
                End If
            Next prj
        Next pri
        answerProvider = MsgBox(studentname & " already has a session with " & ws.Cells(1, Target.Column).Value & " on:" & vbNewLine & vbNewLine & allProvConflicts & vbNewLine & "You are trying to move to:" & vbNewLine & "  - Day: " & destDay & "  |  Time: " & Format(destTime, "h:mm AM/PM") & "  |  Provider: " & ws.Cells(1, Target.Column).Value & vbNewLine & vbNewLine & "Do you want to override?", vbYesNo + vbExclamation, "Same Provider Conflict")
        If answerProvider = vbNo Then cancelMove = True
    End If

    If cancelMove = True Then
        Application.EnableEvents = False
        Application.Undo
        Application.EnableEvents = True
        Call ClearHighlights
        ws.Activate
        beforeValue = ""
        beforeAddress = ""
        MsgBox "Move cancelled. All cells restored.", vbInformation
        Exit Sub
    End If

    If beforeAddress <> Target.Address Then
        Application.EnableEvents = False
        ws.Range(beforeAddress).Value = ""
        Application.EnableEvents = True
    End If

    Call ClearHighlights
    ws.Activate
    beforeValue = ""
    beforeAddress = ""
    Exit Sub

cleanup:
    isSelecting = False
    Application.EnableEvents = True
End Sub
