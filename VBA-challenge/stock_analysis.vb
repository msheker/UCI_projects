Sub prog():
    lastTicker = ""
    curOpen = 0
    numTicker = 2
    sumVol = 0
    i = 2
    
    maxInc = 0
    minDec = 0
    maxVol = 0
    
    Cells(1, 9) = "Ticker"
    Cells(1, 10) = "Yearly Change"
    Cells(1, 11) = "Percent Change"
    Cells(1, 12) = "Total Stock Volume"
    
    'iterate while ticker is nonempty
    While IsEmpty(Cells(i, 1)) = False
        curTicker = Cells(i, 1)
        sumVol = sumVol + Cells(i, 7)
        
        If lastTicker = "" Then
            lastTicker = curTicker
            curOpen = Cells(i, 3)
        End If
        
        If curTicker <> lastTicker Then
            Cells(numTicker, 9) = Cells(i - 1, 1)
            'output change from opening
            Cells(numTicker, 10) = Cells(i - 1, 6) - curOpen
                        
            'green
            If Cells(numTicker, 10) > 0 Then
                Cells(numTicker, 10).Interior.ColorIndex = 4
            'red
            Else
                Cells(numTicker, 10).Interior.ColorIndex = 3
            End If
            
            'null check
            If curOpen <> 0 Then
                Cells(numTicker, 11) = (Cells(i - 1, 6) - curOpen) / curOpen
            Else
                Cells(numTicker, 11) = 0
            End If
            Cells(numTicker, 12) = sumVol
            
            ' find max volume
            If sumVol > maxVol Then
                maxVol = sumVol
            End If
            
            ' find max inc and min dec
            If Cells(numTicker, 11) > 0 And Cells(numTicker, 11) > maxInc Then
                maxInc = Cells(numTicker, 11)
            ElseIf Cells(numTicker, 11) < 0 And Cells(numTicker, 11) < minDec Then
                minDec = Cells(numTicker, 11)
            End If
            
            Cells(numTicker, 11) = FormatPercent(Cells(numTicker, 11), 2)
            
            lastTicker = curTicker
            curOpen = Cells(i, 3)
            numTicker = numTicker + 1
            'MsgBox (curTicker)
        End If
        
        curTicker = lastTicker
        i = i + 1
    Wend
    
    'input final row
    Cells(numTicker, 9) = Cells(i - 1, 1)
    
    'output change from opening
    Cells(numTicker, 10) = Cells(i - 1, 6) - curOpen
                        
    'green
    If Cells(numTicker, 10) > 0 Then
        Cells(numTicker, 10).Interior.ColorIndex = 4
    'red
    Else
        Cells(numTicker, 10).Interior.ColorIndex = 3
    End If
            
    'null check
    If curOpen <> 0 Then
        Cells(numTicker, 11) = (Cells(i - 1, 6) - curOpen) / curOpen
    Else
        Cells(numTicker, 11) = 0
    End If
            
    Cells(numTicker, 12) = sumVol
            
    ' find max volume
    If sumVol > maxVol Then
        maxVol = sumVol
    End If
            
    ' find max inc and min dec
    If Cells(numTicker, 11) > 0 And Cells(numTicker, 11) > maxInc Then
        maxInc = Cells(numTicker, 11)
    ElseIf Cells(numTicker, 11) < 0 And Cells(numTicker, 11) < minDec Then
        minDec = Cells(numTicker, 11)
    End If
        
    Cells(numTicker, 11) = FormatPercent(Cells(numTicker, 11), 2)
        
    lastTicker = curTicker
    curOpen = Cells(i, 3)
    numTicker = numTicker + 1
    
    'save results
    Cells(1, 14) = "Greatest Increase (%)"
    Cells(2, 14) = "Greatest Decrease (%)"
    Cells(3, 14) = "Greatest Total Volume"
            
    Cells(1, 15) = maxInc
    Cells(2, 15) = minDec
    Cells(3, 15) = sumVol
    
End Sub
