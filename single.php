<?php get_header(); ?>

<div class="container-fluid">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8">
				<?php
				if(have_posts()) {
				    while(have_posts()) {
				        the_post(); ?>
						<article>
							<section class="section-single-head">
				    			<?php the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive mtop-30']); ?>
							</section>
							<section class="section-single-body padding-30 bg-fff">
						        <h1 class="title"><?php the_title(); ?></h1>
								<?php the_content(); ?>
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
