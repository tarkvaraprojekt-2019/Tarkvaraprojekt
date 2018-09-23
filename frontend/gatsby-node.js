"use strict"

exports.createPages = ({ actions, graphql }) => {
    
  const { createRedirect } = actions
  // One-off redirect
  createRedirect({
    fromPath: `/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/login/`,
  })
}