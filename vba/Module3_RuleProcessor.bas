Attribute VB_Name = "Module3"
Sub process_new_rule()
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
