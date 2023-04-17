import { app, BrowserWindow, globalShortcut } from 'electron'
import Screenshots from './screenshots'

app.whenReady().then(() => {
  const screenshots = new Screenshots({
    lang: {
      operation_rectangle_title: '矩形'
    },
    singleWindow: true
  })
  screenshots.$view.webContents.openDevTools()

  globalShortcut.register('CommandOrControl+Alt+A', () => {
    screenshots.startCapture()
  })

  // 防止不能关闭截图界面
  globalShortcut.register('Esc', () => {
    screenshots.endCapture()
  })

  const mainWin = new BrowserWindow({
    show: true
  })
  mainWin.removeMenu()
  mainWin.loadURL('https://baidu.com/')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
