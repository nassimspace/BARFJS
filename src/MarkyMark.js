// MarkyMark Markdown Parser
(function () {
	const markymark = function (md) {
		return md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank" rel="noopener">$1</a>')
			.replace(/\*\*(.*?)\*\*/ig, '<strong>$1</strong>')
			.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>')
			.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="" data-src="$2" alt="$1" style="display: block;margin-left: auto;margin-right: auto;width: 75%" lazyload>')
			.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>')
			.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>')
			.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">')
			.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n')
			.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>')
			.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>')
			.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>')
			.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>')
			.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>')
			.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>')
			.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>')
			.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>')
			.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>')
			.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
	};
	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = markymark;
	} else {
		window.markymark = markymark;
	}
})();
