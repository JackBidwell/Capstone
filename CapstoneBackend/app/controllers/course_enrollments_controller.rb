class CourseEnrollmentsController < ApplicationController
  def index
    @course_enrollments = CourseEnrollment.all
  end

  def new
    @course_enrollment = CourseEnrollment.new
  end

  def create
    @course_enrollment = CourseEnrollment.new(course_enrollment_params)
    if @course_enrollment.save
      redirect_to courses_path, notice: 'Enrollment was successfully created.'
    else
      render :new
    end
  end

  def destroy
    @course_enrollment = CourseEnrollment.find(params[:id])
    @course_enrollment.destroy
    redirect_to course_enrollments_url, notice: 'Enrollment was successfully canceled.'
  end

  private

  def course_enrollment_params
    params.require(:course_enrollment).permit(:user_id, :course_id, :enrollment_date, :status)
  end
end
