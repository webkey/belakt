app.productCardGallery = {
	sliderElement: '.js-pc-gallery',
	fancyboxElement: '.js-pc-gallery-fancybox',
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.lazyLoad();
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	lazyLoad() {
		const self = this;
		app.common.initScript('lazyload.min', 'LazyLoad', () => {
			app.lazyLoadNewsSliderInstance = new LazyLoad({
				threshold: 50,
				elements_selector: self.sliderElement + ' .lazy-load',
				class_loaded: 'image-loaded'
			});
		});
	},
	runSlider() {
		const $slider = $(this.sliderElement);
		const self = this;

		if ($slider.length) {
			const cardGalleryThumbsTpl = $(`<div class="product-card-gallery__thumbs">
												<div class="product-card-gallery-thumbs">
													<div class="product-card-gallery-thumbs__button product-card-gallery-thumbs__button_prev js-pc-gallery-thumbs__button-prev"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22 8l3.3 3.3-.94.94L5.33 8l4.25-4.24.94.94L7.22 8z" fill="#000"></path></svg></div>
													<div class="swiper-container">
														<div class="swiper-wrapper"></div>
													</div>
													<div class="product-card-gallery-thumbs__button product-card-gallery-thumbs__button_next js-pc-gallery-thumbs__button-next"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.78 8l-3.3-3.3.94-.94L10.67 8l-4.25 4.24-.94-.94L8.78 8z" fill="#000"></path></svg></div>
												</div>
											</div>`);

			$slider.each(function () {
				const $curSlider = $(this);
				const $imagesSlider = $curSlider.find('.js-pc-gallery-images');

				// Create thumbs
				$imagesSlider.parent().after(cardGalleryThumbsTpl.clone());


				const $galleryThumbs = $curSlider.find('.product-card-gallery-thumbs');
				const $galleryThumbsArrPrev = $galleryThumbs.find('.js-pc-gallery-thumbs__button-prev');
				const $galleryThumbsArrNext = $galleryThumbs.find('.js-pc-gallery-thumbs__button-next');

				$.each($imagesSlider.find('.swiper-slide'), function () {
					const $curSlide = $(this);
					$galleryThumbs.find('.swiper-wrapper').append($('<div class="swiper-slide product-card-gallery-thumbs__item" style="background-image: url(' + $curSlide.find('[data-thumb]').attr('data-thumb') + ')"></div>'));
				});

				const thumbsSliderInstance = new Swiper($galleryThumbs.find('.swiper-container'), {
					spaceBetween: 10,
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					navigation: {
						prevEl: $galleryThumbsArrPrev,
						nextEl: $galleryThumbsArrNext,
					}
				});

				const imagesSliderInstance = new Swiper($imagesSlider, {
					init: false,
					spaceBetween: 10,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					thumbs: {
						swiper: thumbsSliderInstance,
					},
					pagination: {
						type: 'bullets',
						el: '.js-pc-gallery-images__pagination',
						clickable: true,
						bulletClass: 'product-card-gallery-images__pagination-bullet',
						bulletActiveClass: 'product-card-gallery-images__pagination-bullet_active',
						renderBullet(index, className) {
							return '<div class="' + className + '"><span></span></div>';
						}
					},
					on: {
						slideChangeTransitionEnd() {
							if (app.lazyLoadNewsSliderInstance) {
								app.lazyLoadNewsSliderInstance.update();
							}
						}
					}
				});

				imagesSliderInstance.on('init', function () {
					$curSlider.addClass('is-loaded');
				});

				app.common.initScript('jquery.fancybox.min', 'fancybox', () => {
					$().fancybox({
						selector: '.js-pc-gallery-fancybox:visible',
						closeExisting: true,
						baseClass: 'fancybox-gallery',
						buttons: [
							'zoom',
							'thumbs',
							'close'
						],
						beforeClose(instance, current) {
							imagesSliderInstance.slideTo(current.index);
							$('html').removeClass('css-scroll-fixed');
						},
						afterShow() {
							$('html').addClass('css-scroll-fixed');
						}
					});
				});
				app.common.initStyle('jquery.fancybox.min');

				imagesSliderInstance.init();
			});

			$('body').on('click', '.js-pc-gallery-images__zoom', function (e) {
				const $curBtnZoom = $(this);
				e.preventDefault();
				$curBtnZoom.closest($slider).find('.swiper-slide-active').find(self.fancyboxElement).trigger('click');
			});
		}
	}
};
