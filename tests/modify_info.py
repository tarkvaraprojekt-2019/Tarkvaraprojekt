from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()

try:
    driver.get("http://localhost")

    inputEmail = driver.find_element_by_id("email")
    inputEmail.send_keys("asdf")

    inputPassword = driver.find_element_by_id("password")
    inputPassword.send_keys("asdf")
    inputPassword.submit()

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))

    inputFirstName = driver.find_element_by_id("first_name")
    inputFirstName.send_keys("Pille")
    inputFirstName.submit()

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//td[contains(text(), 'PAGAN')]")))

    row = driver.find_element_by_xpath("//td[contains(text(), 'PAGAN')]")
    row.click()

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'MUUDA ISIKUANDMEID')]")))

    editButton = driver.find_element_by_xpath("//span[contains(text(), 'MUUDA ISIKUANDMEID')]")
    editButton.click()

    phone = driver.find_element_by_id("phone")
    phone.clear()
    phone.send_keys("12345")

    submitButton = driver.find_element_by_xpath("//span[contains(text(), 'SALVESTA')]")
    submitButton.click()

    driver.get("http://localhost")

    inputEmail = driver.find_element_by_id("email")
    inputEmail.send_keys("asdf")

    inputPassword = driver.find_element_by_id("password")
    inputPassword.send_keys("asdf")
    inputPassword.submit()

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "first_name")))

    inputFirstName = driver.find_element_by_id("first_name")
    inputFirstName.send_keys("Pille")
    inputFirstName.submit()

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//td[contains(text(), 'PAGAN')]")))

    row = driver.find_element_by_xpath("//td[contains(text(), 'PAGAN')]")
    row.click()

    phone = driver.find_element_by_id("phone")

    WebDriverWait(driver, 10).until(EC.text_to_be_present_in_element_value((By.ID, "phone"), "1"))
    assert phone.get_attribute("value") == "12345"
    print ("Modifying info - Success!")

    editButton = driver.find_element_by_xpath("//span[contains(text(), 'MUUDA ISIKUANDMEID')]")
    editButton.click()

    phone = driver.find_element_by_id("phone")
    phone.clear()
    phone.send_keys("563")

    submitButton = driver.find_element_by_xpath("//span[contains(text(), 'SALVESTA')]")
    submitButton.click()

finally:
    driver.quit()