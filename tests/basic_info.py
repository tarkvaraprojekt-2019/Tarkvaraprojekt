from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import traceback

driver = webdriver.Firefox()

try:
    driver.get("http://localhost")

    inputEmail = driver.find_element_by_id("email")
    inputEmail.send_keys("asdf")

    inputPassword = driver.find_element_by_id("password")
    inputPassword.send_keys("asdf")
    inputPassword.submit()

    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))
    except TimeoutException:
        inputPassword.submit()
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))
    except TimeoutException:
        submitButton = driver.find_element_by_xpath("//button[@type='submit']")
        submitButton.click()

    WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.ID, "first_name")))


    inputFirstName = driver.find_element_by_id("first_name")
    inputFirstName.send_keys("Pille")
    #inputFirstName.submit()

    submitButton = driver.find_element_by_xpath("//button[@type='submit']")
    submitButton.click()

    WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.XPATH, "//td[contains(text(), 'PAGAN')]")))

    row = driver.find_element_by_xpath("//td[contains(text(), 'PAGAN')]")
    row.click()

    WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.ID, "national_id")))

    national_ID = driver.find_element_by_id("national_id")

    WebDriverWait(driver, 60).until(EC.text_to_be_present_in_element_value((By.ID, "national_id"), "4"))
    assert national_ID.get_attribute("value") == "47102042742"
    print ("Basic info retrieval - Success!")

except TimeoutException as e:
    traceback.print_exc()
    b64_img = driver.get_screenshot_as_base64()
    print(b64_img)
    sys.exit(1)

finally:
    driver.quit()