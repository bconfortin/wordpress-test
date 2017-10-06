<?php get_header(); ?>

<div class="container-fluid">
	<div class="row">
		<div class="col-xs-12 padding-0">
			<img src="http://placehold.it/1920x350" alt="" class="img-responsive mbottom-30">
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8">
				<?php
				if(have_posts()) {
				    while(have_posts()) {
						 the_post(); ?>
						<div class="card-home bg-fff mbottom-30">
							<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('post-thumbnail', array('class' => 'img-responsive')); ?></a>
							<div class="padding-15">
								<h2 class="font-700 font-1-5em text-uppercase mtop-0"><?php the_title(); ?></h2>
						        <p class="line-height-1-7 font-1-1em"><?= get_the_excerpt(); ?></p>
								<a href="<?php the_permalink(); ?>" class="btn btn-primario text-uppercase padhor-30">Leia mais</a>
							</div>
						</div>
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
