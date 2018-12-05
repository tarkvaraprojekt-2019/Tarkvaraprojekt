"use strict"

exports.onCreatePage = ({ page, actions }) => {

  const { createPage } = actions

  // Dynamic pages for victims
  if (page.path === '/victim/') { // note the trailing slash here
    page.matchPath = '/victim/*'
    createPage(page)
  }
}