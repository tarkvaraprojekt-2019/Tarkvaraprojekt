"use strict"

exports.createPages = ({ actions, graphql }) => {
    
  const { createRedirect } = actions

  // One-off redirect
  // createRedirect({
  //   fromPath: `/`,
  //   isPermanent: true,
  //   redirectInBrowser: true,
  //   toPath: `/login/`,
  // })
};

exports.onCreatePage = ({ page, actions }) => {

  const { createPage } = actions

  // Dynamic pages for victims
  if (page.path === '/victim/') { // note the trailing slash here
    page.matchPath = '/victim/*'
    createPage(page)
  }
}