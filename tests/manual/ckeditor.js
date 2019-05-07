import SectionsEditor from '../../build/ckeditor';

const options = {
	masterTemplate: 'page',
	templates: {
		"page": {
			"label": "Page",
			"icon": "text",
			"template": "<div class=\"page\" itemtype=\"page\">\n  <ck-container class=\"page__container\" itemprop=\"sections\" ck-contains=\"text image teaser\"></ck-container>\n</div>\n"
		},
		"teaser": {
			"label": "Teaser",
			"icon": "text",
			"template": "<ck-section class=\"teaser\" itemtype=\"teaser\" data-layout=\"\">\n  <div data-media-type=\"media:image\"\n       data-media-uuid=\"\"\n       itemprop=\"image\"\n       itemtype=\"teaser-image\"\n       class=\"teaser__image\"\n  ></div>\n  <div class=\"teaser__content\">\n    <h2 ck-input=\"plain\" itemprop=\"headline\" class=\"teaser__headline\">Headline</h2>\n    <div ck-input=\"full\" itemprop=\"text\" class=\"teaser__text\">Content</div>\n    <ck-button itemtype=\"button\" itemprop=\"link\" class=\"teaser__link\" link-target=\"\">\n      <div itemprop=\"text\" ck-input=\"plain\">Link text placeholder</div>\n    </ck-button>\n  </div>\n</ck-section>\n"
		},
		"image": {
			"label": "Image",
			"icon": "image",
			"template": "<ck-section class=\"image\" itemtype=\"image\">\n  <ck-media\n    data-media-type=\"media:image\"\n    data-media-uuid=\"\"\n    itemprop=\"content\"\n    itemtype=\"media\"\n    class=\"image__media\"\n  ></ck-media>\n  <div class=\"image__caption\" ck-input=\"basic\" itemprop=\"caption\">Caption</div>\n</ck-section>\n"
		},
		"text": {
			"label": "Text",
			"icon": "text",
			"template": "<div class=\"text\" itemtype=\"text\">\n    <h2 ck-input=\"plain\" itemprop=\"headline\">Enter a headline ...</h2>\n    <div class=\"text__content\" ck-input=\"full\" itemprop=\"content\">Enter some content ...</div>\n</div>\n"
		}
	},
	templateAttributes: null,
	templateSession: 'random'
};

const editor = document.querySelector( '#editor' );
initEditor(editor, options);

function initEditor(editor, options) {
	editor.classList.add('ck-editor');

	editor.addEventListener('ck-editor:available-sections', function (event) {
		var sections = Object.keys(options.templates).map(id => ({
			id: id,
			label: options.templates[id].label,
			icon: options.templates[id].icon
		}));
		event.respond(sections)
	});

	function handleSelect(event, response) {
		setTimeout(function() {
			event.respond(response);
		}, 500);
	}

	editor.addEventListener('ck-editor:media-select', function (event) {
		handleSelect(event, '400');
	});

	editor.addEventListener('ck-editor:media-upload', function (event) {
		handleSelect(event, '500');
	});

	editor.addEventListener('ck-editor:media-edit', function (event) {
		handleSelect(event, '600');
	});

	editor.addEventListener('ck-editor:media-preview', function (event) {
		// @note:
		const uuid = event.detail.uuid;
		const height = parseInt(uuid, 10);
		return event.respond('<img src="https://picsum.photos/600/' + height + '" />');
	});

	editor.addEventListener('ck-editor:select-link', function (event) {
		event.respond('https://example.com');
	});

	SectionsEditor.create( editor, options )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( err => {
			console.error( err.stack );
		} );
}
