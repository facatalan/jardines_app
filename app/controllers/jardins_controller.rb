class JardinsController < ApplicationController
  # GET /jardins
  # GET /jardins.xml
  def index
    @jardins = Jardin.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @jardins }
    end
  end

  # GET /jardins/1
  # GET /jardins/1.xml
  def show
    @jardin = Jardin.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @jardin }
    end
  end

  # GET /jardins/new
  # GET /jardins/new.xml
  def new
    @jardin = Jardin.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @jardin }
    end
  end

  # GET /jardins/1/edit
  def edit
    @jardin = Jardin.find(params[:id])
  end

  # POST /jardins
  # POST /jardins.xml
  def create
    @jardin = Jardin.new(params[:jardin])

    respond_to do |format|
      if @jardin.save
        format.html { redirect_to(@jardin, :notice => 'Jardin was successfully created.') }
        format.xml  { render :xml => @jardin, :status => :created, :location => @jardin }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @jardin.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /jardins/1
  # PUT /jardins/1.xml
  def update
    @jardin = Jardin.find(params[:id])

    respond_to do |format|
      if @jardin.update_attributes(params[:jardin])
        format.html { redirect_to(@jardin, :notice => 'Jardin was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @jardin.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /jardins/1
  # DELETE /jardins/1.xml
  def destroy
    @jardin = Jardin.find(params[:id])
    @jardin.destroy

    respond_to do |format|
      format.html { redirect_to(jardins_url) }
      format.xml  { head :ok }
    end
  end
end
