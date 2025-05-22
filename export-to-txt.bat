@echo off
setlocal enabledelayedexpansion

:: Doelmap
set "OUTDIR=TXT"
set "SAMENVOEG=%OUTDIR%\alles.txt"

:: Maak TXT-map aan als die nog niet bestaat
if not exist "%OUTDIR%" (
  mkdir "%OUTDIR%"
)

:: Leeg samenvoegbestand
echo. > "%SAMENVOEG%"

:: Directories om te includen
set INCLUDE_DIRS=pages components styles lib types

:: Paden om te negeren
set EXCLUDE_DIRS=node_modules .next TXT

:: Bestandsextensies
set FILETYPES=ts tsx css

:: Loop per folder + extensie
for %%D in (%INCLUDE_DIRS%) do (
  if exist "%%D" (
    for %%E in (%FILETYPES%) do (
      call :kopieerBestanden "%%D" "%%E"
    )
  )
)

:: Rootbestanden meenemen (excl. package-lock.json)
for %%F in (
  Dockerfile
  docker-compose.yml
  package.json
  tsconfig.json
  next.config.js
  wrangler.toml
  .env.example
) do (
  if exist "%%F" (
    copy "%%F" "%OUTDIR%\%%F.txt" >nul
    echo BESTAND: %%F>>"%SAMENVOEG%"
    type "%%F" >> "%SAMENVOEG%"
    echo. >> "%SAMENVOEG%"
  )
)

echo ✅ Export en samenvoeging voltooid. Alles staat in %OUTDIR%\alles.txt
pause
exit /b

:: --------------------------------------
:: Subroutine om bestanden te kopiëren
:: --------------------------------------
:kopieerBestanden
set "DIR=%~1"
set "EXT=%~2"

for /R "%DIR%" %%F in (*.%EXT%) do (
  set "skip=0"
  for %%X in (%EXCLUDE_DIRS%) do (
    echo %%F | findstr /i "\\%%X\\" >nul
    if !errorlevel! == 0 set "skip=1"
  )

  if !skip! == 0 (
    set "file=%%~nxF"
    setlocal enabledelayedexpansion
    copy "%%F" "%OUTDIR%\!file!.txt" >nul
    echo BESTAND: !file!>>"%SAMENVOEG%"
    type "%%F" >> "%SAMENVOEG%"
    echo. >> "%SAMENVOEG%"
    endlocal
  )
)

exit /b
