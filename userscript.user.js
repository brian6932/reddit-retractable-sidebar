// ==UserScript==
// @name         Reddit Retractable Sidebar
// @namespace    https://greasyfork.org/users/581142
// @namespace    https://github.com/brian6932/reddit-retractable-sidebar
// @version      0.5.0
// @description  Make Reddit's Sidebar Retractable
// @author       brian6932
// @include      /^https?:\/{2}(?:[^.]+\.)?reddit\.com\/(?!submit$)/
// @grant        none
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/brian6932/reddit-retractable-sidebar/refs/heads/gh-pages/userscript.user.js
// @updateURL    https://raw.githubusercontent.com/brian6932/reddit-retractable-sidebar/refs/heads/gh-pages/userscript.user.js
// ==/UserScript==
// jshint esversion: 11

'use strict'

if (/(?:^|; )redesign_optout=true;/.test(document.cookie) || /^https?:\/{2}old\./.test(location)) {
	document.head.innerHTML += "<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' type='text/css'>"

	const
		dark = matchMedia("(prefers-color-scheme:dark)").matches,
		style = `
			<style>
				#sidebar-button {
					background: ${dark ? "#292929" : "#1A1A1A"};
					color: ${dark ? "#CEE3F8" : "#212121"};
					display: ${localStorage.getItem("noButton") !== "1" ? "flex" : "none"};
					justify-content: center;
					align-items: center;
					height: 42px;
					width: 42px;
					font-size: 32px;
					border-radius: 100px;
					box-shadow: 0px 3px 5px 0px rgba(33,33,33,0.3);
					position: fixed;
					top: 50%;
					right: -7px;
					cursor: pointer;
					z-index: 9983
				}
			</style>
			`,
		leftIcon = '<i class="material-icons">chevron_left</i>' + style,
		rightIcon = '<i class="material-icons">chevron_right</i>' + style,
		content = document.querySelector("html"),
		sidebarButton = document.createElement("div"),
		sidebar = document.querySelector("div.side"),
		score = document.createElement("span"),
		voteTotal = document.querySelector(".linkinfo span.totalvotes"),
		lsKey = "sidebarRetracted",
		input = new Set()
			.add("INPUT")
			.add("TEXTAREA")

	sidebarButton.id = "sidebar-button"

	/**************************
	Add vote information below link so that when
	the sidebar is hidden you can still see what vote
	percentage and total votes you have.
	***************************/
	let votePercentage = document.querySelector(".score").lastChild.textContent
	if (votePercentage.at(-1) === ")") {
		// value typically looks like " (int% upvoted)"
		votePercentage = votePercentage.slice(2, -1)
		score.innerHTML = voteTotal === null
			? votePercentage + ", "
			: votePercentage + " out of " + voteTotal.textContent + " total, "
		document.querySelector("#siteTable .tagline").prepend(score)
	}

	/**************************
	Some style changes to fix the way certain templates
	render with this script.
	***************************/
	document.body.style.cssText += "@media(max-width:850px){div#siteTable{max-width:100vw}}"

	/*****************************
	Functions for hiding and showing the sidebar
	****************************/
	const
		sidebarToggle = [
			// show
			() => {
				sidebar.style.display = "block"
				content.style = {
					"margin-right": "335px"
				}
				sidebarButton.innerHTML = rightIcon
				localStorage.setItem(lsKey, "0")
			},
			// hide
			() => {
				sidebar.style.display = "none"
				content.style = {
					"margin-right": "15px"
				}
				sidebarButton.innerHTML = leftIcon
				localStorage.setItem(lsKey, "1")
			}
		],
		onclick = () => sidebarToggle[localStorage.getItem(lsKey) ^ 1]()

	sidebarButton.addEventListener("click", onclick)
	sidebarToggle[localStorage.getItem(lsKey) & 1]()

	document.body.appendChild(sidebarButton)

	/*******************************
	Causes the sidebar to retract when you press "q"
	********************************/
	document.querySelector("body").addEventListener("keydown", e => {
		if (!input.has(e.target.tagName) && e.key === "q")
			onclick()
	})
}
else
	console.error("This script only supports Old Reddit")
