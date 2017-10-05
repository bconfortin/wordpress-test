<form action="<?php echo home_url( '/' ); ?>" method="get" class="form-inline">
    <div class="form-group">
        <input type="text" name="s" id="search" value="<?php the_search_query(); ?>" class="form-control force-radius-0">
    </div>
    <button type="submit" id="searchsubmit" class="btn btn-primario text-uppercase">Pesquisar</button>
</form>
