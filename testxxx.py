from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.facebook.com")
input("Đăng nhập vào Facebook, sau đó nhấn Enter...")
cookies = {c['name']: c['value'] for c in driver.get_cookies()}
fb_dtsg = driver.execute_script("return require('DTSGInitialData').token")
print("Cookies mới:", cookies)
print("fb_dtsg mới:", fb_dtsg)
driver.quit()