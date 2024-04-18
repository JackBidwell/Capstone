class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :check_admin, only: [:create, :destroy]
  before_action :check_admin_or_instructor, only: [:update]


  def index
    @courses = Course.includes(:instructor).all
    render :index
  end


  def show
    render json: @course
  end


  def create
    @course = Course.new(course_params)

    if @course.save
      render json: @course, status: :created
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end


  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @course.destroy
    head :no_content
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:name, :description, :duration)
  end

end
