<?php get_header(); ?>

<div class="container-fluid">
	<div class="container">
		<div class="row">
			<div class="col-xs-8">
				<?php
				if(have_posts()) {
				    while(have_posts()) { ?>
				        <?php the_post(); ?>
						<article>
							<section>
				    			<?php the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive']); ?>
							</section>
							<section>
						        <h2 class="font-700 font-1-5em text-uppercase"><?php the_title(); ?></h2>
						        <p class="line-height-1-7 font-1-1em"><?= get_the_content(); ?></p>
							</section>
						</article>
				    <?php }
				}
				?>
			</div>
			<div class="col-xs-12 col-sm-4">
				<?php if ( is_active_sidebar( 'widgets_direita' ) ) : ?>
					<div id="primary-sidebar" class="primary-sidebar widget-area" role="complementary">
						<?php dynamic_sidebar( 'widgets_direita' ); ?>
					</div><!-- #primary-sidebar -->
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>


<?php get_footer(); ?>
