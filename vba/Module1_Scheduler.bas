Attribute VB_Name = "Module1"
Sub run_prog()

Dim allowDuplicate As Integer
allowDuplicate = MsgBox("Do you want to allow scheduling the same session more than once a week?", vbYesNo + vbQuestion, "Duplicate Session Policy")

Application.DisplayAlerts = False
Application.ScreenUpdating = False
On Error Resume Next
ThisWorkbook.Sheets("Remaining Sessions").Delete
On Error GoTo 0
Dim result As Long, result2 As Long
Set studentws = ThisWorkbook.Sheets("Student Mandates List")
studentws.Copy after:=studentws
Set inputws = ActiveSheet
inputws.Name = "Remaining Sessions"
nrows = inputws.Cells(inputws.Rows.Count, 1).End(xlUp).Row

Set provws = ThisWorkbook.Sheets("Providers Config")
nrowtime = provws.Cells(provws.Rows.Count, 1).End(xlUp).Row

Set dtws = ThisWorkbook.Sheets("Draft")
Set outputws = ThisWorkbook.Sheets("Timeslot")

Set restrictionws = ThisWorkbook.Sheets("Student Restrictions")
Set Allowedws = ThisWorkbook.Sheets("Allowed Students")

outputws.Range("D2:AZ10000").ClearContents
dtws.Range("A3:AZ10000").ClearContents
ndt = 3
ncol = provws.Cells(1, provws.Columns.Count).End(xlToLeft).Column

provws.Range(provws.Cells(1, 4), provws.Cells(nrowtime, ncol)).Copy outputws.Range("D1")
nextloop = False

For i = 2 To nrows
    studentname = inputws.Range("A" & i)
    dtws.Cells(ndt, 1) = studentname
    For k = 2 To 7
        dtws.Cells(ndt, k) = 3
    Next k
    For j = 3 To 9 Step 2
        nextloop = False
        start_row = 2
        Do Until inputws.Cells(i, j) = "" Or inputws.Cells(i, j) = 0 Or nextloop = True
            nextloop = False
            prov = Trim(LCase(inputws.Cells(i, j - 1)))
            session = Trim(LCase(Split(inputws.Cells(1, j - 1))(0)))
            col_prov = 0
            For k = 4 To ncol
                If InStr(LCase(outputws.Cells(1, k)), prov) > 0 And Trim(Split(LCase(outputws.Cells(1, k)), "-")(1)) = session Then
                    col_prov = k
                    Exit For
                End If
            Next k
            If col_prov = 0 Then
                MsgBox "Provider " & prov & " on row " & i & " for student " & studentname & " does not exit on provider config sheet row 1", vbCritical
                Exit Sub
            End If
            For k = start_row To nrowtime
                dayname = LCase(outputws.Cells(k, 1))
                course = LCase(outputws.Cells(k, 3))
                timeslot = outputws.Cells(k, 2)
                freecell = False
                If session <> "pt" And LCase(outputws.Cells(k, col_prov)) = "x" And outputws.Cells(k, col_prov).Interior.ColorIndex = xlNone Then
                    freecell = True
                ElseIf session = "pt" And outputws.Cells(k, col_prov).Interior.ColorIndex = xlNone And course <> "event" And Trim(outputws.Cells(k, col_prov)) <> "" Then
                    If LCase(outputws.Cells(k, col_prov)) = "x" Then
                        freecell = True
                    Else
                        If Trim(Split(outputws.Cells(k, col_prov), "-")(1)) = "" Then
                            freecell = True
                        Else
                            freecell = False
                        End If
                    End If
                End If
                If freecell = True Then
                    For m = 4 To ncol
                        If InStr(LCase(outputws.Cells(k, m)), LCase(Trim(studentname))) > 0 Then
                            freecell = False
                            Exit For
                        End If
                    Next m
                    If freecell = True Then
                        Dim p As Long
                        For p = 2 To nrowtime
                            If p <> k Then
                                If outputws.Cells(p, 2) = timeslot Then
                                    Dim q As Long
                                    For q = 4 To ncol
                                        If InStr(LCase(outputws.Cells(p, q)), LCase(Trim(studentname))) > 0 Then
                                            freecell = False
                                            Exit For
                                        End If
                                    Next q
                                End If
                            End If
                            If freecell = False Then Exit For
                        Next p
                    End If
                    If freecell = True Then
                        Dim chkRow As Long
                        For chkRow = 2 To nrowtime
                            If LCase(outputws.Cells(chkRow, 1).Value) = dayname Then
                                If chkRow <> k Then
                                    If InStr(LCase(outputws.Cells(chkRow, col_prov).Value), LCase(Trim(studentname))) > 0 Then
                                        freecell = False
                                        Exit For
                                    End If
                                End If
                            End If
                        Next chkRow
                    End If
                    If freecell = True Then
                        If dayname = "sunday" Then
                            col_dt = 2
                            col_dt_prov = 8
                        ElseIf dayname = "monday" Then
                            col_dt = 3
                            col_dt_prov = 9
                        ElseIf dayname = "tuesday" Then
                            col_dt = 4
                            col_dt_prov = 10
                        ElseIf dayname = "wednesday" Then
                            col_dt = 5
                            col_dt_prov = 11
                        ElseIf dayname = "thursday" Then
                            col_dt = 6
                            col_dt_prov = 12
                        ElseIf dayname = "friday" Then
                            col_dt = 7
                            col_dt_prov = 13
                        End If
                        If dtws.Cells(ndt, col_dt) > 0 Then
                            coursename = False
                            If course <> "lunch" And course <> "break" And course <> "breakfast" Then
                                result = 0
                                On Error Resume Next
                                result = Application.Match(course, dtws.Rows(ndt), 0)
                                On Error GoTo 0
                                result2 = WorksheetFunction.CountIf(dtws.Rows(ndt), course)
                                coursename = True
                            Else
                                result = 0
                                result2 = WorksheetFunction.CountIf(dtws.Rows(ndt), course)
                                coursename = True
                            End If
                            If result2 >= 1 Then
                                If allowDuplicate = vbYes Then
                                    result = 0
                                    result2 = 0
                                End If
                            End If
                            If result = 0 And result2 < 1 Then
                                If InStr(LCase(dtws.Cells(ndt, col_dt_prov)), prov) <= 0 Then
                                    solsameday = False
                                    continueval = False
                                    If Allowedws.Range("D" & k) = "" Then
                                        continueval = True
                                    Else
                                        result = 0
                                        On Error Resume Next
                                        result = Application.Match(studentname, Allowedws.Rows(k), 0)
                                        On Error GoTo 0
                                        If result > 0 Then
                                            continueval = True
                                        End If
                                    End If
                                    If continueval = True Then
                                        result = 0
                                        On Error Resume Next
                                        result = Application.Match(studentname, restrictionws.Rows(k), 0)
                                        On Error GoTo 0
                                        If result = 0 Then
                                            dtws.Cells(ndt, col_dt_prov) = dtws.Cells(ndt, col_dt_prov) & "-" & prov
                                            inputws.Cells(i, j) = inputws.Cells(i, j) - 1
                                            If session = "pt" Then
                                                If LCase(outputws.Cells(k, col_prov)) = "x" Then
                                                    outputws.Cells(k, col_prov) = studentname & "-"
                                                Else
                                                    outputws.Cells(k, col_prov) = outputws.Cells(k, col_prov) & studentname
                                                End If
                                            Else
                                                outputws.Cells(k, col_prov) = studentname
                                            End If
                                            If coursename = True Then
                                                ncolcourse = WorksheetFunction.Max(dtws.Cells(ndt, dtws.Columns.Count).End(xlToLeft).Column, 15)
                                                dtws.Cells(ndt, ncolcourse + 1) = course
                                                dtws.Cells(ndt, col_dt) = dtws.Cells(ndt, col_dt) - 1
                                            End If
                                            start_row = k + 1
                                            Exit For
                                        End If
                                    End If
                                Else
                                    solsameday = True
                                    save_k = k
                                End If
                            Else
                                solsameday = True
                                save_k = k
                            End If
                        Else
                            solsameday = True
                            save_k = k
                        End If
                    End If
                End If
            Next k
            If k >= nrowtime Then
               If solsameday = True Then
                solsameday = False
                    For m = 2 To nrowtime
                        dayname = LCase(outputws.Cells(m, 1))
                        coursenew = LCase(outputws.Cells(m, 3))
                        freecell = False
                        If session <> "pt" And outputws.Cells(m, col_prov) <> "" And outputws.Cells(m, col_prov) <> "x" And outputws.Cells(m, col_prov).Interior.ColorIndex = xlNone And coursenew <> "event" Then
                            freecell = True
                            studentname2 = outputws.Cells(m, col_prov)
                        ElseIf session = "pt" And LCase(outputws.Cells(m, col_prov)) <> "x" And LCase(outputws.Cells(m, col_prov)) <> "" And outputws.Cells(m, col_prov).Interior.ColorIndex = xlNone And coursenew <> "event" And Trim(outputws.Cells(m, col_prov)) <> "" Then
                            If Trim(Split(outputws.Cells(m, col_prov), "-")(0)) <> "" Then
                                freecell = True
                                studentname2 = Trim(Split(outputws.Cells(m, col_prov), "-")(0))
                            Else
                                studentname2 = Trim(Split(outputws.Cells(m, col_prov), "-")(1))
                            End If
                        End If
                        If freecell = True Then
                            dayname2 = LCase(outputws.Cells(save_k, 1))
                            freecell1 = True
                            freecell2 = True
                            For s = 4 To ncol
                                If InStr(LCase(outputws.Cells(save_k, s)), LCase(Trim(studentname2))) > 0 Then
                                    freecell1 = False
                                    Exit For
                                End If
                            Next s
                            For s = 4 To ncol
                                If InStr(LCase(outputws.Cells(k, s)), LCase(Trim(studentname))) > 0 Then
                                    freecell2 = False
                                    Exit For
                                End If
                            Next s
                            If freecell1 = True And freecell2 = True Then
                                Dim chkRow2 As Long
                                For chkRow2 = 2 To nrowtime
                                    If LCase(outputws.Cells(chkRow2, 1).Value) = LCase(outputws.Cells(save_k, 1).Value) Then
                                        If chkRow2 <> save_k Then
                                            If InStr(LCase(outputws.Cells(chkRow2, col_prov).Value), LCase(Trim(studentname))) > 0 Then
                                                freecell2 = False
                                                Exit For
                                            End If
                                        End If
                                    End If
                                Next chkRow2
                            End If
                            If freecell1 = True And freecell2 = True Then
                                If dayname = "sunday" Then
                                    col_dt = 2
                                    col_dt_prov = 8
                                ElseIf dayname = "monday" Then
                                    col_dt = 3
                                    col_dt_prov = 9
                                ElseIf dayname = "tuesday" Then
                                    col_dt = 4
                                    col_dt_prov = 10
                                ElseIf dayname = "wednesday" Then
                                    col_dt = 5
                                    col_dt_prov = 11
                                ElseIf dayname = "thursday" Then
                                    col_dt = 6
                                    col_dt_prov = 12
                                ElseIf dayname = "friday" Then
                                    col_dt = 7
                                    col_dt_prov = 13
                                End If
                                If dayname2 = "sunday" Then
                                    col_dt2 = 2
                                    col_dt_prov2 = 8
                                ElseIf dayname2 = "monday" Then
                                    col_dt2 = 3
                                    col_dt_prov2 = 9
                                ElseIf dayname2 = "tuesday" Then
                                    col_dt2 = 4
                                    col_dt_prov2 = 10
                                ElseIf dayname2 = "wednesday" Then
                                    col_dt2 = 5
                                    col_dt_prov2 = 11
                                ElseIf dayname2 = "thursday" Then
                                    col_dt2 = 6
                                    col_dt_prov2 = 12
                                ElseIf dayname2 = "friday" Then
                                    col_dt2 = 7
                                    col_dt_prov2 = 13
                                End If
                                For s = 2 To ndt
                                    If dtws.Cells(s, 1) = studentname2 Then
                                        ndt2 = s
                                        Exit For
                                    End If
                                Next s
                                If dtws.Cells(ndt, col_dt) > 0 And dtws.Cells(ndt2, col_dt) > 0 Then
                                    coursenewname = False
                                    If coursenew <> "lunch" And coursenew <> "break" And coursenew <> "breakfast" And coursenew <> outputws.Cells(save_k, 3) Then
                                        result = 0
                                        On Error Resume Next
                                        result = Application.Match(coursenew, dtws.Rows(ndt), 0)
                                        On Error GoTo 0
                                        result2 = WorksheetFunction.CountIf(dtws.Rows(ndt), coursenew)
                                        coursenewname = True
                                    Else
                                        result = 0
                                        result2 = WorksheetFunction.CountIf(dtws.Rows(ndt), coursenew)
                                        coursenewname = True
                                    End If
                                    If result2 >= 1 Then
                                        If allowDuplicate = vbYes Then
                                            result = 0
                                            result2 = 0
                                        End If
                                    End If
                                    If result = 0 And result2 < 1 Then
                                        If outputws.Cells(save_k, 3) <> "lunch" And outputws.Cells(save_k, 3) <> "break" And outputws.Cells(save_k, 3) <> "breakfast" And outputws.Cells(save_k, 3) <> outputws.Cells(m, 3) Then
                                            result = 0
                                            On Error Resume Next
                                            result = Application.Match(outputws.Cells(save_k, 3), dtws.Rows(ndt2), 0)
                                            On Error GoTo 0
                                            coursenewname = True
                                        Else
                                            result = 0
                                            coursenewname = False
                                        End If
                                    End If
                                    If result = 0 Then
                                        If InStr(LCase(dtws.Cells(ndt2, col_dt_prov2)), prov) <= 0 Then
                                            continueval = False
                                            If Allowedws.Range("D" & k) = "" Then
                                                continueval = True
                                            Else
                                                result = 0
                                                On Error Resume Next
                                                result = Application.Match(studentname2, Allowedws.Rows(save_k), 0)
                                                On Error GoTo 0
                                                If result > 0 Then
                                                    continueval = True
                                                End If
                                            End If
                                            If continueval = True Then
                                                result = 0
                                                On Error Resume Next
                                                result = Application.Match(studentname2, restrictionws.Rows(save_k), 0)
                                                On Error GoTo 0
                                                result2 = 0
                                                On Error Resume Next
                                                result2 = Application.Match(studentname, restrictionws.Rows(m), 0)
                                                On Error GoTo 0
                                                If result = 0 And result2 = 0 Then
                                                    If InStr(LCase(dtws.Cells(ndt, col_dt_prov)), prov) <= 0 Then
                                                        dtws.Cells(ndt, col_dt_prov) = dtws.Cells(ndt, col_dt_prov) & "-" & prov
                                                        dtws.Cells(ndt2, col_dt_prov) = Replace(dtws.Cells(ndt2, col_dt_prov), prov, "")
                                                        inputws.Cells(i, j) = inputws.Cells(i, j) - 1
                                                        outputws.Cells(m, col_prov) = Replace(outputws.Cells(m, col_prov), studentname2, studentname)
                                                        If session = "pt" Then
                                                            If LCase(outputws.Cells(save_k, col_prov)) = "x" Then
                                                                outputws.Cells(save_k, col_prov) = studentname2 & "-"
                                                            Else
                                                                outputws.Cells(save_k, col_prov) = outputws.Cells(save_k, col_prov) & studentname2
                                                            End If
                                                        Else
                                                            outputws.Cells(save_k, col_prov) = studentname2
                                                        End If
                                                        If coursenewname = True Then
                                                            ncolcourse = WorksheetFunction.Max(dtws.Cells(ndt, dtws.Columns.Count).End(xlToLeft).Column, 15)
                                                            If LCase(outputws.Cells(m, 3)) <> "lunch" And LCase(outputws.Cells(m, 3)) <> "break" And LCase(outputws.Cells(m, 3)) <> "breakfast" Then
                                                                dtws.Cells(ndt, ncolcourse + 1) = outputws.Cells(m, 3)
                                                            End If
                                                            dtws.Cells(ndt, col_dt) = dtws.Cells(ndt, col_dt) - 1
                                                            If LCase(outputws.Cells(save_k, 3)) <> "lunch" And LCase(outputws.Cells(save_k, 3)) <> "break" And LCase(outputws.Cells(save_k, 3)) <> "breakfast" And outputws.Cells(save_k, 3) <> outputws.Cells(m, 3) Then
                                                                ncolcourse = WorksheetFunction.Max(dtws.Cells(ndt2, dtws.Columns.Count).End(xlToLeft).Column, 15)
                                                                For Z = 15 To ncolcourse
                                                                    If dtws.Cells(ndt2, Z) = outputws.Cells(m, 3) Then
                                                                        dtws.Cells(ndt2, Z) = ""
                                                                        Exit For
                                                                    End If
                                                                Next Z
                                                                dtws.Cells(ndt2, ncolcourse + 1) = outputws.Cells(save_k, 3)
                                                            End If
                                                        End If
                                                        Exit For
                                                    End If
                                                End If
                                            End If
                                        End If
                                    End If
                                End If
                            End If
                        End If
                    Next m
                    If m >= nrowtime Then
                        nbsessions = nbsessions + inputws.Cells(i, j)
                        resultall = resultall & vbNewLine & "No solution to allocate " & studentname & " for " & prov
                        nextloop = True
                        GoTo nextloop
                    End If
                Else
                    nbsessions = nbsessions + inputws.Cells(i, j)
                    resultall = resultall & vbNewLine & "No solution to allocate " & studentname & " for " & prov
                    nextloop = True
                    GoTo nextloop
                End If
            End If
nextloop:
        Loop
    Next j
    ndt = ndt + 1
Next i

If resultall <> "" Then
    inputws.Name = "Remaining Sessions"
    inputws.Range("C:C,E:E,G:G,I:I").FormatConditions.Add Type:=xlCellValue, Operator:=xlGreater, Formula1:="=0"
    inputws.Range("C:C,E:E,G:G,I:I").FormatConditions(inputws.Range("C:C,E:E,G:G,I:I").FormatConditions.Count).SetFirstPriority
    With inputws.Range("C:C,E:E,G:G,I:I").FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With inputws.Range("C:C,E:E,G:G,I:I").FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
    inputws.Range("C:C,E:E,G:G,I:I").FormatConditions(1).StopIfTrue = False
    On Error Resume Next
    inputws.Shapes("Rectangle 1").Delete
    On Error GoTo 0
    MsgBox "Done." & vbNewLine & "Number of non affected sessions: " & nbsessions & vbNewLine & "Please find below exceptions:" & resultall & vbNewLine & vbNewLine & "For more details, check sheet Remaining sessions", vbInformation
Else
    MsgBox "Done. No exceptions", vbInformation
    inputws.Delete
    Application.DisplayAlerts = True
End If
outputws.Columns.AutoFit
outputws.Select
Application.ScreenUpdating = True
End Sub

Sub DisableDragDrop()
    Application.CellDragAndDrop = False
    MsgBox "Drag and drop disabled.", vbInformation
End Sub

Sub EnableDragDrop()
    Application.CellDragAndDrop = True
    MsgBox "Drag and drop enabled.", vbInformation
End Sub

Sub ManualOverrideScheduling()

Application.DisplayAlerts = False
Application.ScreenUpdating = False

Dim ws As Worksheet
Set ws = ThisWorkbook.Sheets("Timeslot")
Dim inputws As Worksheet

On Error Resume Next
Set inputws = ThisWorkbook.Sheets("Remaining Sessions")
On Error GoTo 0

If inputws Is Nothing Then
    MsgBox "Please run the schedule first before using manual override.", vbExclamation
    Exit Sub
End If

Dim provws As Worksheet
Set provws = ThisWorkbook.Sheets("Providers Config")
Dim nrowtime As Long
nrowtime = provws.Cells(provws.Rows.Count, 1).End(xlUp).Row
Dim ncol As Long
ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
Dim nrows As Long
nrows = inputws.Cells(inputws.Rows.Count, 1).End(xlUp).Row

Dim i As Long, j As Long, k As Long
Dim dismissAll As Boolean
dismissAll = False

For i = 2 To nrows
    If dismissAll Then Exit For
    Dim studentname As String
    studentname = inputws.Range("A" & i)
    If studentname = "" Then GoTo NextStudent

    For j = 3 To 9 Step 2
        If dismissAll Then GoTo NextStudent
        If inputws.Cells(i, j) = "" Or inputws.Cells(i, j) = 0 Then GoTo NextSession

        Dim sessionsLeft As Long
        sessionsLeft = inputws.Cells(i, j)
        Dim prov As String
        Dim session As String
        prov = Trim(LCase(inputws.Cells(i, j - 1)))
        session = Trim(LCase(Split(inputws.Cells(1, j - 1))(0)))

        Dim col_prov As Long
        col_prov = 0
        For k = 4 To ncol
            If InStr(LCase(ws.Cells(1, k)), prov) > 0 And Trim(Split(LCase(ws.Cells(1, k)), "-")(1)) = session Then
                col_prov = k
                Exit For
            End If
        Next k

        If col_prov = 0 Then GoTo NextSession

        Dim sessionsDone As Long
        sessionsDone = 0

        Do While sessionsDone < sessionsLeft

            Dim slotMsg As String
            slotMsg = "STUDENT: " & studentname & vbNewLine
            slotMsg = slotMsg & "Provider: " & ws.Cells(1, col_prov).Value & vbNewLine
            slotMsg = slotMsg & "Sessions remaining: " & (sessionsLeft - sessionsDone) & vbNewLine
            slotMsg = slotMsg & String(40, "-") & vbNewLine
            slotMsg = slotMsg & "AVAILABLE SLOTS:" & vbNewLine & vbNewLine

            Dim slotRows() As Long
            Dim slotCount As Long
            slotCount = 0
            ReDim slotRows(200)

            Dim r As Long
            For r = 2 To nrowtime
                Dim provConfigVal As String
                provConfigVal = ""
                Dim pc As Long
                For pc = 2 To provws.Cells(provws.Rows.Count, 1).End(xlUp).Row
                    If LCase(provws.Cells(pc, 1).Value) = LCase(ws.Cells(r, 1).Value) And _
                       provws.Cells(pc, 2).Value = ws.Cells(r, 2).Value Then
                        provConfigVal = Trim(provws.Cells(pc, col_prov).Value)
                        Exit For
                    End If
                Next pc

                If LCase(provConfigVal) <> "x" Then GoTo SkipSlot

                Dim cellVal As String
                cellVal = Trim(ws.Cells(r, col_prov).Value)
                If cellVal <> "" And LCase(cellVal) <> "x" Then GoTo SkipSlot
                If InStr(LCase(cellVal), LCase(studentname)) > 0 Then GoTo SkipSlot
                If ws.Cells(r, col_prov).Interior.ColorIndex <> xlNone Then
                    If ws.Cells(r, col_prov).Interior.Color = RGB(0, 0, 255) Then GoTo SkipSlot
                End If

                Dim dayR As String
                Dim timeR As Variant
                dayR = LCase(ws.Cells(r, 1).Value)
                timeR = ws.Cells(r, 2).Value

                ' Rule 1 and Rule 3 - NEVER allowed - hard block
                Dim hardBlock As Boolean
                hardBlock = False
                Dim s As Long, t As Long
                For s = 2 To nrowtime
                    For t = 4 To ncol
                        If InStr(LCase(ws.Cells(s, t).Value), LCase(studentname)) > 0 Then
                            ' Rule 1: Same day same timeslot - NEVER override
                            If LCase(ws.Cells(s, 1).Value) = dayR And ws.Cells(s, 2).Value = timeR Then
                                hardBlock = True
                            End If
                            ' Rule 3: Same provider same day - NEVER override
                            If LCase(ws.Cells(s, 1).Value) = dayR And LCase(ws.Cells(1, t).Value) = LCase(ws.Cells(1, col_prov).Value) Then
                                hardBlock = True
                            End If
                        End If
                    Next t
                Next s
                If hardBlock Then GoTo SkipSlot

                slotRows(slotCount) = r
                slotMsg = slotMsg & (slotCount + 1) & ".  " & ws.Cells(r, 1).Value & "  |  " & Format(ws.Cells(r, 2).Value, "h:mm AM/PM") & vbNewLine

                ' Only check Rule 2 for warning - it is the only overridable rule
                Dim rule2warn As Boolean
                rule2warn = False
                For s = 2 To nrowtime
                    For t = 4 To ncol
                        If InStr(LCase(ws.Cells(s, t).Value), LCase(studentname)) > 0 Then
                            If ws.Cells(s, 2).Value = timeR And LCase(ws.Cells(s, 1).Value) <> dayR Then
                                rule2warn = True
                            End If
                        End If
                    Next t
                Next s

                If rule2warn Then
                    slotMsg = slotMsg & "      *** RULE 2: Same timeslot on another day (overridable) ***" & vbNewLine
                Else
                    slotMsg = slotMsg & "      (No conflicts)" & vbNewLine
                End If
                slotMsg = slotMsg & vbNewLine
                slotCount = slotCount + 1

SkipSlot:
                If slotCount >= 30 Then Exit For
            Next r

            If slotCount = 0 Then
                MsgBox "No available slots found for " & studentname & " with " & ws.Cells(1, col_prov).Value & vbNewLine & vbNewLine & "This provider has no availability or all slots are taken.", vbExclamation
                GoTo NextSession
            End If

            slotMsg = slotMsg & String(40, "-") & vbNewLine
            slotMsg = slotMsg & "Type the slot NUMBER to assign." & vbNewLine
            slotMsg = slotMsg & "Type S to Skip this student." & vbNewLine
            slotMsg = slotMsg & "Type D to Dismiss all remaining students." & vbNewLine
            slotMsg = slotMsg & "Type Q to Quit manual override."

            Dim userInput As String
            userInput = InputBox(slotMsg, "Manual Override - " & studentname & " (" & i - 1 & " of " & nrows - 1 & ")")

            If UCase(userInput) = "Q" Then
                MsgBox "Manual override stopped.", vbInformation
                Application.ScreenUpdating = True
                Exit Sub
            End If

            If UCase(userInput) = "D" Then
                dismissAll = True
                MsgBox "All remaining students dismissed.", vbInformation
                Application.ScreenUpdating = True
                ws.Select
                Exit Sub
            End If

            If UCase(userInput) = "S" Then
                GoTo NextSession
            End If

            Dim selectedNum As Long
            On Error Resume Next
            selectedNum = CLng(userInput)
            On Error GoTo 0

            If selectedNum < 1 Or selectedNum > slotCount Then
                MsgBox "Invalid number. Please try again.", vbExclamation
            Else
                Dim assignRow As Long
                assignRow = slotRows(selectedNum - 1)

                Application.EnableEvents = False
                If session = "pt" Then
                    If LCase(ws.Cells(assignRow, col_prov).Value) = "x" Then
                        ws.Cells(assignRow, col_prov).Value = studentname & "-"
                    Else
                        ws.Cells(assignRow, col_prov).Value = ws.Cells(assignRow, col_prov).Value & studentname
                    End If
                Else
                    ws.Cells(assignRow, col_prov).Value = studentname
                End If
                Application.EnableEvents = True

                inputws.Cells(i, j) = inputws.Cells(i, j) - 1
                sessionsLeft = inputws.Cells(i, j)
                sessionsDone = sessionsDone + 1

                MsgBox studentname & " assigned to " & ws.Cells(assignRow, 1).Value & " at " & Format(ws.Cells(assignRow, 2).Value, "h:mm AM/PM") & " with " & ws.Cells(1, col_prov).Value & vbNewLine & vbNewLine & "Sessions remaining: " & sessionsLeft, vbInformation, "Assigned"

                If sessionsLeft = 0 Then Exit Do
            End If
        Loop

NextSession:
    Next j

NextStudent:
Next i

Application.ScreenUpdating = True
ws.Select
MsgBox "Manual override completed.", vbInformation, "Done"

End Sub

Sub RapidAutoPlace()

Dim ws As Worksheet
Set ws = ThisWorkbook.Sheets("Timeslot")
Dim inputws As Worksheet

On Error Resume Next
Set inputws = ThisWorkbook.Sheets("Remaining Sessions")
On Error GoTo 0

If inputws Is Nothing Then
    MsgBox "Please run the schedule first before using Rapid Auto Place.", vbExclamation
    Exit Sub
End If

Dim provws As Worksheet
Set provws = ThisWorkbook.Sheets("Providers Config")
Dim nrowtime As Long
nrowtime = provws.Cells(provws.Rows.Count, 1).End(xlUp).Row
Dim ncol As Long
ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
Dim nrows As Long
nrows = inputws.Cells(inputws.Rows.Count, 1).End(xlUp).Row

' Only Rule 2 can be relaxed
Dim relaxMsg As String
relaxMsg = "RAPID AUTO PLACE" & vbNewLine & vbNewLine
relaxMsg = relaxMsg & "Note: Rule 1 and Rule 3 are NEVER relaxed." & vbNewLine
relaxMsg = relaxMsg & "Only Rule 2 can be overridden." & vbNewLine & vbNewLine
relaxMsg = relaxMsg & "1 = Strict - All rules enforced" & vbNewLine
relaxMsg = relaxMsg & "2 = Relax Rule 2 only (allow same timeslot on different day)" & vbNewLine & vbNewLine
relaxMsg = relaxMsg & "Type the number:"

Dim relaxChoice As String
relaxChoice = InputBox(relaxMsg, "Rapid Auto Place - Choose Mode")
If relaxChoice = "" Then Exit Sub

Dim relax2 As Boolean
relax2 = False

Select Case relaxChoice
    Case "1": relax2 = False
    Case "2": relax2 = True
    Case Else
        MsgBox "Invalid choice.", vbExclamation
        Exit Sub
End Select

Application.DisplayAlerts = False
Application.ScreenUpdating = False
Application.EnableEvents = False

Dim placed As Long
Dim failed As Long
Dim failedList As String
placed = 0
failed = 0
failedList = ""

Dim i As Long, j As Long, k As Long

For i = 2 To nrows
    Dim studentname As String
    studentname = inputws.Range("A" & i)
    If studentname = "" Then GoTo NextStudent

    For j = 3 To 9 Step 2
        If inputws.Cells(i, j) = "" Or inputws.Cells(i, j) = 0 Then GoTo NextSession

        Dim sessionsLeft As Long
        sessionsLeft = inputws.Cells(i, j)
        Dim prov As String
        Dim session As String
        prov = Trim(LCase(inputws.Cells(i, j - 1)))
        session = Trim(LCase(Split(inputws.Cells(1, j - 1))(0)))

        Dim col_prov As Long
        col_prov = 0
        For k = 4 To ncol
            If InStr(LCase(ws.Cells(1, k)), prov) > 0 And Trim(Split(LCase(ws.Cells(1, k)), "-")(1)) = session Then
                col_prov = k
                Exit For
            End If
        Next k

        If col_prov = 0 Then GoTo NextSession

        Dim sessionsDone As Long
        sessionsDone = 0

        Do While sessionsDone < sessionsLeft
            Dim foundSlot As Boolean
            foundSlot = False
            Dim r As Long

            For r = 2 To nrowtime
                Dim provConfigVal As String
                provConfigVal = ""
                Dim pc As Long
                For pc = 2 To provws.Cells(provws.Rows.Count, 1).End(xlUp).Row
                    If LCase(provws.Cells(pc, 1).Value) = LCase(ws.Cells(r, 1).Value) And _
                       provws.Cells(pc, 2).Value = ws.Cells(r, 2).Value Then
                        provConfigVal = Trim(provws.Cells(pc, col_prov).Value)
                        Exit For
                    End If
                Next pc

                If LCase(provConfigVal) <> "x" Then GoTo SkipR

                Dim cellVal As String
                cellVal = Trim(ws.Cells(r, col_prov).Value)
                If cellVal <> "" And LCase(cellVal) <> "x" Then GoTo SkipR
                If InStr(LCase(cellVal), LCase(studentname)) > 0 Then GoTo SkipR

                Dim dayR As String
                Dim timeR As Variant
                dayR = LCase(ws.Cells(r, 1).Value)
                timeR = ws.Cells(r, 2).Value

                ' Rule 1 and Rule 3 ALWAYS enforced - never relaxed
                Dim s As Long, t As Long
                For s = 2 To nrowtime
                    For t = 4 To ncol
                        If InStr(LCase(ws.Cells(s, t).Value), LCase(studentname)) > 0 Then
                            ' Rule 1: Never override
                            If LCase(ws.Cells(s, 1).Value) = dayR And ws.Cells(s, 2).Value = timeR Then
                                GoTo SkipR
                            End If
                            ' Rule 3: Never override
                            If LCase(ws.Cells(s, 1).Value) = dayR And LCase(ws.Cells(1, t).Value) = LCase(ws.Cells(1, col_prov).Value) Then
                                GoTo SkipR
                            End If
                        End If
                    Next t
                Next s

                ' Rule 2: Only enforced if not relaxed
                If relax2 = False Then
                    For s = 2 To nrowtime
                        For t = 4 To ncol
                            If InStr(LCase(ws.Cells(s, t).Value), LCase(studentname)) > 0 Then
                                If ws.Cells(s, 2).Value = timeR And LCase(ws.Cells(s, 1).Value) <> dayR Then
                                    GoTo SkipR
                                End If
                            End If
                        Next t
                    Next s
                End If

                ' All checks passed - place student
                If session = "pt" Then
                    If LCase(ws.Cells(r, col_prov).Value) = "x" Then
                        ws.Cells(r, col_prov).Value = studentname & "-"
                    Else
                        ws.Cells(r, col_prov).Value = ws.Cells(r, col_prov).Value & studentname
                    End If
                Else
                    ws.Cells(r, col_prov).Value = studentname
                End If

                ' Orange color for Rule 2 override, green for no conflict
                If relax2 Then
                    ws.Cells(r, col_prov).Interior.Color = RGB(255, 165, 0)
                Else
                    ws.Cells(r, col_prov).Interior.Color = RGB(0, 255, 0)
                End If

                inputws.Cells(i, j) = inputws.Cells(i, j) - 1
                sessionsLeft = inputws.Cells(i, j)
                sessionsDone = sessionsDone + 1
                placed = placed + 1
                foundSlot = True
                Exit For

SkipR:
            Next r

            If foundSlot = False Then
                failed = failed + 1
                failedList = failedList & "- " & studentname & " (" & ws.Cells(1, col_prov).Value & ")" & vbNewLine
                Exit Do
            End If

            If sessionsLeft = 0 Then Exit Do
        Loop

NextSession:
    Next j

NextStudent:
Next i

Application.EnableEvents = True
Application.ScreenUpdating = True
ws.Select

Dim finalMsg As String
finalMsg = "RAPID AUTO PLACE COMPLETE" & vbNewLine & vbNewLine
finalMsg = finalMsg & "Successfully placed: " & placed & " session(s)" & vbNewLine

If failed > 0 Then
    finalMsg = finalMsg & "Still unplaced: " & failed & " session(s)" & vbNewLine & vbNewLine
    finalMsg = finalMsg & "STILL FAILED:" & vbNewLine & failedList & vbNewLine
    finalMsg = finalMsg & "Use Manual Override for these remaining students."
Else
    finalMsg = finalMsg & vbNewLine & "All students placed successfully!"
End If

MsgBox finalMsg, vbInformation, "Rapid Auto Place Complete"

End Sub

Sub ColorCodeViolations()

Dim ws As Worksheet
Set ws = ThisWorkbook.Sheets("Timeslot")

Dim nrowtime As Long
nrowtime = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
Dim ncol As Long
ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

Application.ScreenUpdating = False
Application.EnableEvents = False

Dim i As Long, j As Long
For i = 2 To nrowtime
    For j = 4 To ncol
        Dim cellColor As Long
        cellColor = ws.Cells(i, j).Interior.Color
        If cellColor = RGB(255, 165, 0) Or _
           cellColor = RGB(255, 0, 0) Or _
           cellColor = RGB(0, 255, 0) Then
            ws.Cells(i, j).Interior.ColorIndex = xlNone
        End If
    Next j
Next i

Dim violationCount As Long
violationCount = 0

For i = 2 To nrowtime
    For j = 4 To ncol
        Dim cellVal As String
        cellVal = Trim(ws.Cells(i, j).Value)
        If cellVal = "" Or LCase(cellVal) = "x" Then GoTo NextCell

        Dim studentname As String
        studentname = cellVal
        If Right(studentname, 1) = "-" Then
            studentname = Left(studentname, Len(studentname) - 1)
        End If

        Dim dayR As String
        Dim timeR As Variant
        Dim provR As String
        dayR = LCase(ws.Cells(i, 1).Value)
        timeR = ws.Cells(i, 2).Value
        provR = LCase(ws.Cells(1, j).Value)

        Dim hasRule1 As Boolean
        Dim hasRule2 As Boolean
        Dim hasRule3 As Boolean
        hasRule1 = False
        hasRule2 = False
        hasRule3 = False

        Dim s As Long, t As Long
        For s = 2 To nrowtime
            For t = 4 To ncol
                If s = i And t = j Then GoTo NextCheck
                Dim otherVal As String
                otherVal = LCase(Trim(ws.Cells(s, t).Value))
                If otherVal = "" Or otherVal = "x" Then GoTo NextCheck
                Dim otherStudent As String
                otherStudent = otherVal
                If Right(otherStudent, 1) = "-" Then
                    otherStudent = Left(otherStudent, Len(otherStudent) - 1)
                End If
                If LCase(otherStudent) = LCase(studentname) Then
                    If LCase(ws.Cells(s, 1).Value) = dayR And ws.Cells(s, 2).Value = timeR Then hasRule1 = True
                    If ws.Cells(s, 2).Value = timeR And LCase(ws.Cells(s, 1).Value) <> dayR Then hasRule2 = True
                    If LCase(ws.Cells(s, 1).Value) = dayR And LCase(ws.Cells(1, t).Value) = provR Then hasRule3 = True
                End If
NextCheck:
            Next t
        Next s

        ' Rule 1 and 3 violations shown in RED - serious never-allowed violations
        ' Rule 2 violation shown in ORANGE - permitted override
        If hasRule1 Or hasRule3 Then
            ws.Cells(i, j).Interior.Color = RGB(255, 0, 0)
            violationCount = violationCount + 1
        ElseIf hasRule2 Then
            ws.Cells(i, j).Interior.Color = RGB(255, 165, 0)
            violationCount = violationCount + 1
        End If

NextCell:
    Next j
Next i

Application.EnableEvents = True
Application.ScreenUpdating = True

Call AddColorLegend

MsgBox "Color coding complete!" & vbNewLine & vbNewLine & violationCount & " violation(s) found." & vbNewLine & vbNewLine & "COLOR LEGEND:" & vbNewLine & "ORANGE = Rule 2 override (permitted - same timeslot different day)" & vbNewLine & "RED = Rule 1 or Rule 3 violation (should never happen)", vbInformation, "Color Code Complete"

End Sub

Sub AddColorLegend()

Dim ws As Worksheet
Set ws = ThisWorkbook.Sheets("Timeslot")

Dim legendCol As Long
legendCol = 50

ws.Columns(legendCol).Clear
ws.Columns(legendCol + 1).Clear

With ws.Cells(1, legendCol)
    .Value = "VIOLATION LEGEND"
    .Font.Bold = True
    .Font.Size = 11
End With

Dim legendText(2) As String
legendText(0) = "No violations"
legendText(1) = "Rule 2 override - permitted (same timeslot different day)"
legendText(2) = "Rule 1 or Rule 3 - should NEVER occur"

Dim legendColors(2) As Long
legendColors(0) = 0
legendColors(1) = RGB(255, 165, 0)
legendColors(2) = RGB(255, 0, 0)

Dim k As Long
For k = 0 To 2
    With ws.Cells(k + 2, legendCol)
        If legendColors(k) = 0 Then
            .Interior.ColorIndex = xlNone
        Else
            .Interior.Color = legendColors(k)
        End If
        .Value = ""
        .BorderAround xlContinuous, xlThin
    End With
    ws.Cells(k + 2, legendCol + 1).Value = legendText(k)
Next k

ws.Columns(legendCol + 1).AutoFit

End Sub

Sub ClearColorCoding()

Dim ws As Worksheet
Set ws = ThisWorkbook.Sheets("Timeslot")

Dim answer As Integer
answer = MsgBox("This will clear all violation color coding." & vbNewLine & "Do you want to continue?", vbYesNo + vbQuestion, "Clear Color Coding")
If answer = vbNo Then Exit Sub

Application.ScreenUpdating = False
Application.EnableEvents = False

Dim nrowtime As Long
nrowtime = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
Dim ncol As Long
ncol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

Dim i As Long, j As Long
For i = 2 To nrowtime
    For j = 4 To ncol
        Dim cellColor As Long
        cellColor = ws.Cells(i, j).Interior.Color
        If cellColor = RGB(255, 165, 0) Or _
           cellColor = RGB(255, 0, 0) Or _
           cellColor = RGB(0, 255, 0) Then
            ws.Cells(i, j).Interior.ColorIndex = xlNone
        End If
    Next j
Next i

Dim c As Long
For c = 18 To 60
    If InStr(LCase(ws.Cells(1, c).Value), "violation") > 0 Or _
       InStr(LCase(ws.Cells(1, c).Value), "legend") > 0 Then
        ws.Columns(c).Clear
        ws.Columns(c + 1).Clear
    End If
Next c

ws.Columns(50).Clear
ws.Columns(51).Clear

Application.EnableEvents = True
Application.ScreenUpdating = True

MsgBox "All color coding cleared.", vbInformation, "Done"

End Sub


